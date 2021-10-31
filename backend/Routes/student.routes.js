const express = require("express");
//init
const router = express.Router();

//logger
var logger = require("../Controllers/logger").Logger;

//student controller
const studentController = require("../Controllers/student.controller").studentController;

//authentication
const authenticate = require("../Middleware/authentication").authenticate;

//stream controller
const streamController = require("../Controllers/stream.controller").streamController;


// //logging end point for student
// router.post(
//   "/logging",
//   userValidation.logging,
//   authenticate.userAuthenticateBasic,
//   authorize.sendAccessToken,
//   (req, res) => {}
// );

//list all courses
router.post("/course/allList", authenticate.userAuthenticateToken, studentController.listAllCoureses);

//see course details
router.post("/course/details", authenticate.userAuthenticateToken, studentController.courseDetails);

//temporry route
router.get("/", function (req, res) {
    // console.log(__dirname);
    res.sendFile("./test2.html", { root: __dirname });
  });

//stream vedio 
//authenticate.userAuthenticateToken,
router.get("/course/watchVedio/Online", streamController.vedioStream);

//stream vedio authenticate.userAuthenticateToken,
router.get("/course/watchVedio/Offline", streamController.sendVedioFile);

//404
router.use((req, res) => {
  console.log("[-] unknown path to /student routes ...");

  res.status(404).send("Not found");
});

module.exports = router;
