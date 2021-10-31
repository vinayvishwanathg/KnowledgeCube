//bcryptjs
const bcryptjs = require("bcryptjs");

//jwt
const jwt = require("jsonwebtoken");

const userModel = require("../Models/user");

const authenticate = (exports.authenticate = {});

authenticate.userAuthenticateBasic = async function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  // console.log(req.body);
  userModel.findOne({ email: email }, async (err, userDataFromDB) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        Error: "DB Server faild",
      });
    } else {
      if (userDataFromDB) {
        if (userDataFromDB.verify) {
          try {
            // console.log('err');
            const passwordValid = await bcryptjs.compare(
              password,
              userDataFromDB.password
            );
            //console.log(passwordValid);
            if (!passwordValid) {
              console.log(!passwordValid);
              res.status(400).json({
                Error: "Email or password wrong",
              });
            } else {
              const user = {
                id: userDataFromDB._id,
                isTeacher: userDataFromDB.isTeacher,
                userName: userDataFromDB.userName,
              };

              req.user = user;
              console.log("Success in basic authentication...");

              // const accessToken = getToken(payload);
              // //console.log(accessToken);
              // res.json({ token: accessToken, expire: 60 });
              next();
            }
          } catch (err) {
            console.log(err);
            res.status(401).json({
              Error: "Try again",
            });
          }
        } else {
          res.status(400).json({
            Error: "need to verify email",
          });
        }
      } else {
        res.status(400).json({
          Error: "Unauthorized",
        });
      }
    }
  });
};

authenticate.userAuthenticateToken = async function (req, res, next) {
  try {
    const token = req.headers["x-auth-token"];
    console.log(token);
    if (token) {
      console.log("[+] Token valid...");
      jwt.verify(token, process.env.LOGIN_TOKEN, (err, userByToken) => {
        if (err) {
          console.log("[-] Token not valid...");
          res.status(401).json({
            Error: "Token not valid",
          });
        } else {
          userModel.findById(userByToken.id, async (err, dataFromDB) => {
            if (err) {
              console.log("[-] DB error", err);
              res.json({
                Error: "Try again...",
              });
            } else {
              if (dataFromDB) {
                console.log("[+] user found from DB...");
                req.user = {
                  id: dataFromDB._id,
                  isteacher: dataFromDB.isteacher,
                  email: dataFromDB.email,
                };
                console.log("[+] set req...");
                next();
              } else {
                console.log("[-] user is not in DB...");
                res.status(400).json({
                  Error: "Unauthorized",
                });
              }
            }
          });
        }
      });
    } else {
      console.log("[-] Token is not found...");
      res.status(400).json({
        Error: "Unauthorized",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({
      Error: "Unauthorized",
    });
  }
};
