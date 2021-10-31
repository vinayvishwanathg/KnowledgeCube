const express = require("express");
//init
const router = express.Router();

//logger
var logger = require("../Controllers/logger").Logger;

//student controller
const teacherController = require("../Controllers/teacher.controller").teacherController;

//authentication
const authenticate = require("../Middleware/authentication").authenticate;

//stream controller
const streamController = require("../Controllers/stream.controller").streamController;

//image upload controller
const fileUploadController = require("../Controllers/fileUpload.controller").fileUploadController;

//vedio upload controller
const vedioUploadController = require("../Controllers/vedioUpload.controller").vedioUploadController;


// //logging end point for student
// router.post(
//   "/logging",
//   userValidation.logging,
//   authenticate.userAuthenticateBasic,
//   authorize.sendAccessToken,
//   (req, res) => {}
// );

//list all courses
router.post("/course/allList", authenticate.userAuthenticateToken, teacherController.listAllCoureses);

//see course details
router.post("/course/details", authenticate.userAuthenticateToken, teacherController.courseDetails);

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

//upload file
router.post("/course/upload/file", fileUploadController.fileUpload, (req, res) => {
    console.log("[+] successfully uploaded file...");
    res.send(req.file)
 }, (error, req, res, next) => {
    console.log("[-] failed uploaded file...", error);
     res.status(400).send({ error: error.message })
 });

 //upload files
router.post("/course/upload/files", fileUploadController.filesUpload, (req, res) => {
    console.log("[+] successfully uploaded files...");
    res.send(req.files)
 }, (error, req, res, next) => {
    console.log("[-] failed uploaded files...", error);
     res.status(400).send({ error: error.message })
 });

 //upload vedio
router.post("/course/upload/vedio", vedioUploadController.vedioUpload, (req, res) => {
    console.log("[+] successfully uploaded vedio...");
    res.send(req.file)
 }, (error, req, res, next) => {
    console.log("[-] failed uploaded vedio...", error);
     res.status(400).send({ error: error.message })
 });

 //upload vedios
router.post("/course/upload/vedios", vedioUploadController.vediosUpload, (req, res) => {
    console.log("[+] successfully uploaded vedios...");
    res.send(req.files)
 }, (error, req, res, next) => {
    console.log("[-] failed uploaded vedios...", error);
     res.status(400).send({ error: error.message })
 });



//404
router.use((req, res) => {
  console.log("[-] unknown path to /teacher routes ...", req.originalUrl);

  res.status(404).send("Not found");
});

module.exports = router;
