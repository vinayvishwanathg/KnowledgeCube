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
    if (err)
      res.status(500).json({
        Error: "DB Server faild",
      });
    else {
      if (userDataFromDB) {
        if (userDataFromDB.verify) {
          try {
            // console.log('err');
            const passwordValid = await bcryptjs.compare(
              password,
              userData.password
            );
            //console.log(passwordValid);
            if (!passwordValid) {
              // console.log(!passwordValid);
              res.status(400).json({
                Error: "Email or password wrong",
              });
            } else {
              // const payload = {
              //   user: {
              //     id: userData._id,
              //     isTeacher: userData.isTeacher,
              //     userName: userData.userName
              //   },
              // };

              // const accessToken = getToken(payload);
              // //console.log(accessToken);
              // res.json({ token: accessToken, expire: 60 });
              next();
            }
          } catch (err) {
            //console.log('Errrrr');
            res.status(401).json({
              Error: "Try again",
            });
          }
        }
        else{
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
  const token = req.headers["x-auth-token"];
  if (token) {
    jwt.verify(token, process.env.LOGIN_TOKEN, (err, userByToken) => {
      if (err)
        res.status(401).json({
          Error: "Token not valid",
        });
      else {
        userModel.findById(userByToken.user.id, async (err, dataFromDB) => {
          if (err)
            res.json({
              Error: "Try again...",
            });
          else {
            if (dataFromDB) {
              req.user = {
                id: dataFromDB._id,
                isteacher: dataFromDB.isteacher,
                email: dataFromDB.email,
              };
              next();
            } else {
              res.status(400).json({
                Error: "Unauthorized",
              });
            }
          }
        });
      }
    });
  }
};
