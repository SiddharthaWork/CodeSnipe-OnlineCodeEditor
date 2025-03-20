var express = require('express');
var router = express.Router();
var userModel = require("../Model/UserModel")
var bcrypt = require("bcryptjs")
var jwt = require("jsonwebtoken")

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

const secret = "secret"

router.post("/signUp", async (req, res) => {
  let {username, password, email} = req.body;
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
      if(err){ 
        return res.json({ success: false, message: "Something went wrong" })
      }
      if (result) {
        let token = jwt.sign({ email:user.email, userId: user._id }, secret);
        return res.json({ success: true, message: "User Login Successfully",token:token, userId:user._id })
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
  let {userId} = req.body;
  let user = await userModel.findOne({ _id: userId });
  if (user) {
    return res.json({ success: true, message: "User Found",user:user })
  }
  else {
    return res.json({ success: false, message: "User Not Found" })
  }
})

module.exports = router; 
 