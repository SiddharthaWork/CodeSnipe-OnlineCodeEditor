var express = require('express');
var router = express.Router();
var userModel = require("../Model/UserModel")
var bcrypt = require("bcryptjs")
var jwt = require("jsonwebtoken")
var projectModel = require("../Model/ProjectModel")

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

const secret = "secret"

router.post("/signUp", async (req, res) => {
  let { username, password, email } = req.body;
  let emailExists = await userModel.findOne({ email: email })
  if (emailExists) {
    return res.json({ success: false, message: "Email already exists" })
  }
  else {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, function (err, hash) {
        userModel.create({
          username: username,
          password: hash,
          email: email
        })
        return res.json({ success: true, message: "User created successfully" })
      })
    })
  }
})

router.post("/login", async (req, res) => {
  let [email, password] = [req.body.email, req.body.password];
  let user = await userModel.findOne({ email: email });
  if (user) {
    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        return res.json({ success: false, message: "Something went wrong" })
      }
      if (result) {
        let token = jwt.sign({ email: user.email, userId: user._id }, secret);
        return res.json({ success: true, message: "Login Successfully", token: token, userId: user._id })
      }
      else {
        return res.json({ success: false, message: "The Password or Email Might be invalid" })
      }
    })
  }
  else {
    return res.json({ success: false, message: "User Not Found" })
  }
})

router.post("/userDetails", async (req, res) => {
  let { userId } = req.body;
  let user = await userModel.findOne({ _id: userId });
  if (user) {
    return res.json({ success: true, message: "User Found", user: user })
  }
  else {
    return res.json({ success: false, message: "User Not Found" })
  }
})


router.post("/createProject", async (req, res) => {
  let { userId, title } = req.body;
  let user = await userModel.findOne({ _id: userId });

  try {
    if (!user) {
      return res.json({ success: false, message: "User Not Found" })
    }

    if (user) {
      let project = await projectModel.create({
        title: title,
        userId: userId
      })
      return res.json({ success: true, message: "Project Created Successfully", projectId: project._id })
    }
  }

  catch(error){
    return res.status(500).json({ success: false, message: "Something went wrong" })
  }
})

router.post("/getProjects", async (req, res) => {
  let { userId } = req.body;
  let user = await userModel.findOne({ _id: userId });

  if (user) {
    let projects = await projectModel.find({ userId: userId });
    return res.json({ success: true, message: "Projects Found", projects: projects })
  }
  else {
    return res.json({ success: false, message: "User Have not created any project" })    
  }

})

router.delete("/deleteProject/:projectId", async (req, res) => {
  let { projectId } = req.params;
  try {
    let project = await projectModel.findOneAndDelete({ _id: projectId });
    if (project) {
      return res.json({ success: true, message: "Project Deleted Successfully" });
    } else {
      return res.json({ success: false, message: "Project Not Found" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
});


// router.get("/getProject", async (req, res) => {
//   let { userId, projectId } = req.query;
//   let project = await projectModel.findOne({ _id: projectId });
//   if (project) {
//     return res.json({ success: true, message: "Project Found", project: project })
//   }
//   else {
//     return res.json({ success: false, message: "Project Not Found" })
//   }
// })

router.post("/getOneProject", async (req, res) => {
  try {
    const { projectId } = req.body;

    // Validate projectId
    if (!projectId) {
      return res.status(400).json({ success: false, message: "Project ID is required" });
    }

    // Optionally, check if projectId is a valid ObjectId
    if (!projectId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ success: false, message: "Invalid Project ID format" });
    }

    const project = await projectModel.findOne({ _id: projectId });
    if (project) {
      return res.json({ success: true, message: "Project Found", project: project });
    } else {
      return res.status(404).json({ success: false, message: "Project Not Found" });
    }
  } catch (err) {
    console.error("Error fetching project:", err);
    return res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
});

router.post("/updateProject", async (req, res) => {
  const { projectId, userId, htmlcode, csscode, jscode } = req.body;

  const user = await userModel.findOne({ _id: userId });

  if (user) {
    const project = await projectModel.findOneAndUpdate(
      { _id: projectId },
      {
        htmlCode: htmlcode,
        cssCode: csscode,
        jsCode: jscode
      },
      { new: true }
    );

    if (project) {
      return res.json({ success: true, message: "Project Updated Successfully" });
    } else {
      return res.json({ success: false, message: "Project Not Found" });
    }
  } else {
    return res.json({ success: false, message: "User Not Found" });
  }
});


router.get("/getAllProjects", async (req, res) => {
  let projects = await projectModel.find();
  if (projects) {
    return res.json({ success: true, message: "Projects Found", projects: projects })
  }
  else {
    return res.json({ success: false, message: "Projects Not Found" })
  }
})

router.put("/updateProject", async (req, res) => {
  let { projectId, title, htmlcode, csscode, jscode, others } = req.body;
  let project = await projectModel.findOneAndUpdate({ _id: projectId }, { title: title }, { htmlCode: htmlcode }, { cssCode: csscode }, { jsCode: jscode }, { others: others });
  if (project) {
    return res.json({ success: true, message: "Project Updated Successfully" })
  }
  else {
    return res.json({ success: false, message: "Project Not Found" })
  }
})





module.exports = router;
