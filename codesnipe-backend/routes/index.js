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

router.delete("/deleteProject", async (req, res) => {
  let { projectId } = req.body;
  let project = await projectModel.findOneAndDelete({ _id: projectId });
  if (project) {
    return res.json({ success: true, message: "Project Deleted Successfully" })
  }
  else {
    return res.json({ success: false, message: "Project Not Found" })
  }
})

router.update("/updateProjects", async (req, res) => {
  let { projectId, title } = req.body;
  let project = await projectModel.findOneAndUpdate({ _id: projectId }, { title: title });
  if (project) {
    return res.json({ success: true, message: "Project Updated Successfully" })
  }
  else {
    return res.json({ success: false, message: "Project Not Found" })
  }
})

router.get("/getProject", async (req, res) => {
  let { projectId } = req.query;
  let project = await projectModel.findOne({ _id: projectId });
  if (project) {
    return res.json({ success: true, message: "Project Found", project: project })
  }
  else {
    return res.json({ success: false, message: "Project Not Found" })
  }
})

router.getall("/getAllProjects", async (req, res) => {
  let projects = await projectModel.find();
  if (projects) {
    return res.json({ success: true, message: "Projects Found", projects: projects })
  }
  else {
    return res.json({ success: false, message: "Projects Not Found" })
  }
})

module.exports = router;
