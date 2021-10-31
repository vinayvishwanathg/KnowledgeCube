const express = require("express");
//init
const router = express.Router();

//logger
var logger = require("../Controllers/logger").Logger;

//student controller
const studentController =
  require("../Controllers/student.controller").studentController;

//validation
const userValidation = require("../Validations/user.validation").userValidation;

//authentication
const authenticate = require("../Middleware/authentication").authenticate;

//authorize
const authorize = require("../Middleware/authorize").authorize;

//logging end point
router.post(
  "/",
  userValidation.logging,
  authenticate.userAuthenticateBasic,
  authorize.sendAccessToken,
  (req, res) => {}
);

router.use((req, res) => {
  console.log("[-] unknown path to /logging routes ...");

  res.status(404).send("Not found");
});

module.exports = router;
