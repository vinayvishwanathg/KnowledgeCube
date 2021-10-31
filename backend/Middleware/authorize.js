//bcryptjs
const bcryptjs = require("bcryptjs");

//jwt
const jwt = require("jsonwebtoken");

const userModel = require("../Models/user");

const authorize = (exports.authorize = {});

authorize.sendAccessToken = async function (req, res) {
  try {
    if (req.user) {
      console.log(req.user);
      const Token = jwt.sign(req.user, process.env.LOGIN_TOKEN, {
        expiresIn: "30m",
      });

      console.log(Token);
      res.json({ token: Token, expire: 30 });
    } else {
      console.log("req.user is undifined...");
      res.status(401).json({
        Error: "",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      Error: "Error",
    });
  }
};

authorize.teacher = async function (req, res, next) {
  try {
    if (req.user.isteacher) {
      console.log("Authorized...");
      next();
    } else {
      console.log("Unauthorized...");
      res.status(400).json({
        Error: "",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).json({
      Error: "Error",
    });
  }
};
