const express = require("express");
//init
const router = express.Router();

//logger
var logger = require("../Controllers/logger").Logger;

//user vaidation model
const userValidation = require("../Validations/user.validation").userValidation;

//, studentController.signUp userValidation.student
router.post("/student", userValidation.student, (req, res) => {
  console.log("heu");
});

router.use((req, res) => {
  console.log("[-] unknown path to /signUp ...");
  logger.info("Request : " + req.originalUrl);
  res.status(404).send("Not found");
});

module.exports = router;
