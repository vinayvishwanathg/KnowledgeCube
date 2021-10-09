const express = require("express");
//init
const router = express.Router();

//logger
var logger = require("../Controllers/logger").Logger;

//student controller
const studentController = require("../Controllers/student.controller").studentController;

//user vaidation model
const userValidation = require("../Validations/user.validation").userValidation;

//, studentController.signUp userValidation.student
router.post("/student", studentController.signUp, (req, res) => {
  res.status(200).send("fine");

});

router.use((req, res) => {
  console.log("[-] unknown path to /signUp ...");
  
  res.status(404).send("Not found");
});

module.exports = router;
