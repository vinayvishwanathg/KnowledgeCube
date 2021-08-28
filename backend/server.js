const http = require("http");
const fs = require("fs");
const express = require("express");

var logger = require("./controler/logger").Logger;

const dotenv = require("dotenv").config();

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

//middleware
app.use(express.json());

// 404
app.use((req, res) => {
  console.log("in");
  logger.info("Request : " + req.originalUrl);
  res.status(404).send("Not found");
});
