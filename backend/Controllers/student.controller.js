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
          const verifUrl = `http://localhost:3000/student/verify/${verifUrlToken}`;

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
    res.status(400).json(
      {
        Error: "Error",
      }
    )
  }
};
