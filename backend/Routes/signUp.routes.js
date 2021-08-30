const express = require("express");
//init
const router = express.Router();

//, studentController.signUp
router.post("/student", userValidation.student);


module.exports = router;