const bcryptjs = require("bcryptjs");
//jwt
const jwt = require("jsonwebtoken");

const userModel = require("../Models/user");

const sendMail = require("../Middleware/email").sendMail;

const studentController = (exports.studentController = {});

studentController.signUp = async function (req, res) {
  try {
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(req.body.password, salt);

    const user = new userModel({
      userName: req.body.userName,
      password: hashPassword,
      email: req.body.email,
      isTeacher: false,
    });

    await user
      .save()
      .then((user) => {
        console.log("[+] Saved user to the db...");
        try {
          const payload = {
            user: {
              id: user._id,
            },
          };
          // const verifUrl = jwt.sign(usersaved._id, process.env.LOGIN_VARIFICATION_TOKEN, {expiresIn: '10m'});
          const verifUrlToken = jwt.sign(
            payload,
            process.env.STUDENT_LOGIN_VARIFICATION_TOKEN,
            { expiresIn: "10m" }
          );
          const verifUrl = `http://localhost:3000/student/verifyEmail/${verifUrlToken}`;

          sendMail
            .UserMailVerification(user.email, verifUrl)
            .then(() => {
              res.status(200).json({
                message: "Check mail inbox",
              });
            })
            .catch((err) => {
              console.log(err);
              // userModel.findByIdAndDelete(user._id)
              res.status(400).json({
                Error: "Mail send failed",
              });
            });
        } catch (error) {
          console.log(error);
          res.status(400).json({
            Error: "Failed sending mail : " + error,
          });
        }
      })
      .catch((error) => {
        res.status(400).json({
          Error: "User cannot add",
        });
      });
  } catch (error) {
    res.status(400).json({
      Error: "Error",
    });
  }
};

studentController.signUpResendMail = async function (req, res) {
  try {
    userModel.findOne({ email: req.body.email }, async (err, userinfo) => {
      if (err) {
        console.log("[-] Error in finding data base...");
        res.status(400).json({
          Error: "Try again",
        });
      } else {
        if (userinfo) {
          if (userinfo.verify) {
            res.status(200).json({
              Error: "Already verified",
            });
          } else {
            const payload = {
              user: {
                id: userinfo._id,
              },
            };
            // const verifUrl = jwt.sign(usersaved._id, process.env.LOGIN_VARIFICATION_TOKEN, {expiresIn: '10m'});
            const verifyUrlToken = jwt.sign(
              payload,
              process.env.STUDENT_LOGIN_VARIFICATION_TOKEN,
              { expiresIn: "10m" }
            );
            const verifUrl = `http://localhost:3000/student/verifyEmail/${verifyUrlToken}`;
            console.log(verifUrl);
            // sendMailVerification(whom=usersaved.email, url=verifUrl).then((data) => {
            sendMailVerification(userinfo.email, verifUrl)
              .then((data) => {
                res.status(200).json({
                  message: "Email send success",
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(400).json({
                  Error: err,
                });
              });
          }
        } else {
          res.status(400).json({
            Error: "No user found",
          });
        }
      }
    });
  } catch (error) {
    console.log("[-] Error in accessing db...");
  }
};

studentController.signUpEmailVerify = async function (req, res) {
  try {
    jwt.verify(
      req.params.token,
      process.env.STUDENT_LOGIN_VARIFICATION_TOKEN,
      (err, tokenInfo) => {
        if (err)
          res.status(401).json({
            Error: "Token not valid",
          });
        else {
          userModel.findByIdAndUpdate(
            tokenInfo.user.id,
            { verify: true },
            async (err, data) => {
              if (err)
                res.json({
                  Error: "Try again...",
                });
              else {
                // console.log(data);
                if (data) {
                  req.user = data._id;
                  // console.log(data);
                  res.status(200).json({
                    masseage: "Successfully verify",
                  });
                } else {
                  res.status(400).json({
                    Error: "Error",
                  });
                }
              }
            }
          );
        }
      }
    );
  } catch (error) {
    console.log("[-] Error in accessing db...");
    res.status(400).json({
      Error: "Try again",
    });
  }
};
