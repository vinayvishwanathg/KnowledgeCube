const express = require("express");
//init
const router = express.Router();

//logger
var logger = require("../Controllers/logger").Logger;

//student controller
const studentController = require("../Controllers/student.controller").studentController;

//validation
const userValidation = require("../Validations/user.validation").userValidation;

//teacher controller
const teacherController = require("../Controllers/teacher.controller").teacherController;

// user student sign up, studentController.signUp userValidation.student
router.post("/student", userValidation.student, studentController.signUp, (req, res) => {
  // res.status(200).send("Sign up Success...");

});

router.post("/student/resendVerifyEmail", studentController.signUpResendMail, (req, res) => {
  res.status(200).send("fine");

});

router.get("/student/verifyEmail/:token", studentController.signUpEmailVerify, (req, res) => {
  res.status(200).send("fine");

});


//teacher
router.post("/teacher", userValidation.teacher, teacherController.signUp, (req, res) => {
  res.status(200).send("fine");

});

router.post("/teacher/resendVerifyEmail", teacherController.signUpResendMail, (req, res) => {
  res.status(200).send("fine");

});

router.get("/teacher/verifyEmail/:token", teacherController.signUpEmailVerify, (req, res) => {
  res.status(200).send("fine");

});


router.use((req, res) => {
  console.log("[-] unknown path to /signUp ...");
  
  res.status(404).send("Not found");
});

module.exports = router;
