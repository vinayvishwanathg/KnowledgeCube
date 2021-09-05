const http = require("http");
const fs = require("fs");
const express = require("express");

var logger = require("./Controllers/logger").Logger;

const mongoose = require("mongoose");

const dotenv = require("dotenv").config();



var getIP = require('ipware')().get_ip;



if (dotenv.error) {
  throw dotenv.error;
}

//init express
const app = express();

//server initiating
const ser = http
  .createServer(app)
  .listen(process.env.PORT || 5000, "localhost", function () {
    console.log(`Server is listening on port ${process.env.PORT || 5000}`);
    logger.debug("Server listning.");
  });

//data base
// const db = mongoose
//   .connect(process.env.DB_CONNECT, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//   })
//   .then(() => {
//     console.log("Connected to the db...");
//   })
//   .catch((error) => {
//     console.log("Failed to connect db...", error);

//   });


//middleware
app.use(express.json());

//signUp route
const signUp = require("./Routes/signUp.routes");
app.use('/signUp', signUp);

app.use(function(req, res, next) {
  var ipInfo = getIP(req);
  console.log(ipInfo);
  // { clientIp: '127.0.0.1', clientIpRoutable: false }
  next();
});

// 404 route
app.use((req, res) => {
  console.log("[-] unknown path...");
  logger.info("Request : " + req.originalUrl);
  res.status(404).send("Not found");
});


