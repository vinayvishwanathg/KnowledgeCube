// const express = require("express");
// const app = express();
const path = require("path");
const fs = require("fs");
// //middleware
// app.use(express.json());

const multer = require("multer");

const streamController = (exports.streamController = {});

streamController.vedioStream = async function (req, res, next) {
  try {
    // Ensure there is a range given for the video
    // const  vedioName= req.body.vedioName;
    // console.log("h");
    const range = req.headers.range;
    // console.log(range);
    const vedioFileName = "woshika.webm"; // req.body.vedioName;
    if (!range || !vedioFileName) {
      console.log("[-] Missed Range header or Vedio File name...");
      res.status(400).send("Missed Range header or Vedio File name...");
    } else {
      try {
        const vedioName = "./vedios/" + vedioFileName; // + "./images/woshika.webm"
        // get video stats (about 61MB)
        const videoPath = vedioName;
        const videoSize = fs.statSync(vedioName).size;

        // Parse Range
        // Example: "bytes=32324-"
        const CHUNK_SIZE = 10 ** 6; // 1MB
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

        // Create headers
        const contentLength = end - start + 1;
        const headers = {
          "Content-Range": `bytes ${start}-${end}/${videoSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": contentLength,
          "Content-Type": "video/mp4",
        };

        // HTTP Status 206 for Partial Content
        res.writeHead(206, headers);

        // create video read stream for this particular chunk
        const videoStream = fs.createReadStream(videoPath, { start, end });

        // Stream the video chunk to the client
        videoStream.pipe(res);
      } catch (error) {
        console.log(error);
        res.status(400).json({
          message: "Try again...",
        });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Error...",
    });
  }
};

streamController.sendVedioFile = async function (req, res, next) {
  try {
    const vedioName = req.body.vedioName; // = "../images/woshika.webm";
    if (vedioName) {
      var fileName = "../vedios/" + vedioName;
      var filePath = path.join(__dirname, fileName);
      console.log("[+] send vedio file...");
      res.sendFile(filePath);
      // res.sendFile(path.resolve(req.body.vedioName), { root: __dirname });
    } else {
      console.log("[-] No file name...");
      res.status(400).json({
        message: "send file name...",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Try again...",
    });
  }
};

// app.post("/video", (req, res) => {
//   console.log(req.body);
//   res.send(req.body);
//   //res.sendFile('./monika.mp4', { root: __dirname });
// });

//////////////////////////////////

// const imageStorage = async function (folderName, fileName) {
//   return multer.diskStorage({
//     // Destination to store image
//     destination: folderName,
//     filename: (req, file, cb) => {
//       cb(null, file.originalname);
//     },
//   });
// };

// const imageUpload = async function (imageStorage) {
//   multer({
//     storage: imageStorage,
//     limits: {
//       fileSize: 10000000,
//     },
//     fileFilter(req, file, cb) {
//       if (!file.originalname.match(/\.(png|JPG|PDF|pdf)$/)) {
//         // upload only png and jpg format
//         return cb(new Error("Please upload a Image"));
//       }
//       cb(undefined, true);
//     },
//   });
// };

// // For multiple image upload
// app.post("/uploadImageMul", imageUpload.array("images", 4), (req, res) => {
//     res.send(req.files);
//   },
//   (error, req, res, next) => {
//     console.log(error);
//     res.status(400).send({ error: error.message });
//   }
// );

// // For Single image upload
// app.post(
//   "/uploadImage",
//   imageUpload.single("image"),
//   (req, res) => {
//     res.send(req.file);
//   },
//   (error, req, res, next) => {
//     console.log(error);
//     res.status(400).send({ error: error.message });
//   }
// );

// const testFolder = "./images/test/";
// app.get("/testdir", function (req, res) {
//   fs.readdir(testFolder, (err, files) => {
//     files.forEach((file) => {
//       console.log(file);
//     });
//   });
// });

// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/test2.html");
// });

// app.listen(8000, function () {
//   console.log("Listening on port 8000!");
// });

// // const express = require("express");
// // const app = express();
// // const fs = require("fs");
// // const mongodb = require("mongodb");
// // const url = "mongodb://localhost:27017";

// // const mongodbOptions = {
// //   useNewUrlParser: true,
// //   useUnifiedTopology: true,
// // };

// // app.get("/", function (req, res) {
// //   res.sendFile(__dirname + "/test2.html");
// // });

// // // Sorry about this monstrosity -- just for demo purposes
// // app.get("/init-video", function (req, res) {
// //   try {
// //     mongodb.MongoClient.connect(url, mongodbOptions, function (error, client) {
// //       if (error) {
// //         res.json(error);
// //         return;
// //       }
// //       // connect to the videos database
// //       const db = client.db("videos");

// //       // Create GridFS bucket to upload a large file
// //       const bucket = new mongodb.GridFSBucket(db);

// //       // create upload stream using GridFS bucket
// //       const videoUploadStream = bucket.openUploadStream("bigbuck");

// //       // You can put your file instead of bigbuck.mp4
// //       const videoReadStream = fs.createReadStream("./monika.mp4");

// //       // Finally Upload!
// //       videoReadStream.pipe(videoUploadStream);

// //       // All done!
// //       res.status(200).send("Done...");
// //     });
// //   } catch (error) {}
// // });

// // app.get("/mongo-video", function (req, res) {
// //     mongodb.MongoClient.connect(url, function (error, client) {
// //       if (error) {
// //         res.status(500).json(error);
// //         return;
// //       }

// //       // Check for range headers to find our start time
// //       const range = req.headers.range;
// //       if (!range) {
// //         res.status(400).send("Requires Range header");
// //       }

// //       const db = client.db('videos');
// //       // GridFS Collection
// //       db.collection('fs.files').findOne({}, (err, video) => {
// //         if (!video) {
// //           res.status(404).send("No video uploaded!");
// //           return;
// //         }

// //         // Create response headers
// //         const videoSize = video.length;
// //         const start = Number(range.replace(/\D/g, ""));
// //         const end = videoSize - 1;

// //         const contentLength = end - start + 1;
// //         const headers = {
// //           "Content-Range": `bytes ${start}-${end}/${videoSize}`,
// //           "Accept-Ranges": "bytes",
// //           "Content-Length": contentLength,
// //           "Content-Type": "video/mp4",
// //         };

// //         // HTTP Status 206 for Partial Content
// //         res.writeHead(206, headers);

// //         // Get the bucket and download stream from GridFS
// //         const bucket = new mongodb.GridFSBucket(db);
// //         const downloadStream = bucket.openDownloadStreamByName('bigbuck', {
// //           start
// //         });

// //         // Finally pipe video to response
// //         downloadStream.pipe(res);
// //       });
// //     });
// //   });

// // app.listen(8000, function () {
// //   console.log("Listening on port 8000!");
// // });
