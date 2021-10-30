const express = require("express");
//init
const router = express.Router();

//logger
var logger = require("../Controllers/logger").Logger;

//student controller
const studentController = require("../Controllers/student.controller").studentController;

//teacher controller
const teacherController = require("../Controllers/teacher.controller").teacherController;

//, studentController.signUp userValidation.student
router.post("/student", studentController.signUp, (req, res) => {
  res.status(200).send("fine");

});

router.post("/student/verifyEmail", studentController.signUpResendMail, (req, res) => {
  res.status(200).send("fine");

});

router.post("/student/verifyEmail/:token", studentController.signUpEmailVerify, (req, res) => {
  res.status(200).send("fine");

});


//teacher
router.post("/teacher", teacherController.signUp, (req, res) => {
  res.status(200).send("fine");

});

router.post("/teacher/verifyEmail", teacherController.signUpResendMail, (req, res) => {
  res.status(200).send("fine");

});

router.post("/teacher/verifyEmail/:token", teacherController.signUpEmailVerify, (req, res) => {
  res.status(200).send("fine");

});


router.use((req, res) => {
  console.log("[-] unknown path to /signUp ...");
  
  res.status(404).send("Not found");
});

module.exports = router;
