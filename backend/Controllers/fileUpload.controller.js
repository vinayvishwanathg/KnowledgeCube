// const express = require("express");
// const app = express();
const path = require("path");
const fs = require("fs");
// //middleware
// app.use(express.json());

const multer = require("multer");

const fileUploadController = (exports.fileUploadController = {});

var destination = "./Files/";
const fileStorage = multer.diskStorage({
  // Destination to store image req.user.id + 
  destination: (req, file, cb) => {
    cb(null, destination);
  },
  filename: (req, file, cb) => {
    // console.log("file");
    console.log(file);
    cb(null, file.originalname);
  },
});

fileUploadController.fileUpload = multer({
  storage: fileStorage,
  limits: {
    fileSize: 100000000,
  },
  fileFilter(req, file, cb) {
    console.log("file");
    if (!file.originalname.match(/\.(png|jpg|JPG|PDF|pdf)$/)) {
      // upload only png and jpg format
      return cb(new Error("Please upload a file"));
    }
    cb(undefined, true);
  },
}).single("file");

fileUploadController.filesUpload = multer({
  storage: fileStorage,
  limits: {
    fileSize: 100000000,
  },
  fileFilter(req, file, cb) {
    // console.log("file");
    if (!file.originalname.match(/\.(png|jpg|JPG|PDF|pdf)$/)) {
      // upload only png and jpg format
      return cb(new Error("Please upload a files"));
    }
    cb(undefined, true);
  },
}).array('files', 8);

// imageUploadController.imageUpload = async function (req, res, next) {
//   //   var destination = req.user.email + "images";
//   var destination = "images" + "images";
//   const imageStorage = multer.diskStorage({
//     // Destination to store image
//     destination: (req, file, cb) => {
//       cb(null, destination);
//     },
//     filename: (req, file, cb) => {
//       console.log("file");
//       console.log(file);
//       cb(null, file.originalname);
//     },
//   });

//   const imageUpload = multer({
//     storage: imageStorage,
//     limits: {
//       fileSize: 10000000,
//     },
//     fileFilter(req, file, cb) {
//       console.log("file");
//       if (!file.originalname.match(/\.(png|jpg|JPG|PDF|pdf)$/)) {
//         // upload only png and jpg format
//         return cb(new Error("Please upload a Image"));
//       }
//       cb(undefined, true);
//     },
//   });

//   imageUpload.single("image");
//   next();
// };
