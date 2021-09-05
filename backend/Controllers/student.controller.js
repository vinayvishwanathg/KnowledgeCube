const bcryptjs = require("bcryptjs");

const userModel = require("../Models/user");

const studentController = (exports.studentController = {});

studentController.signUp = async function (req, res) {
  const salt = await bcryptjs.genSalt(10);
  const hashPassword = await bcryptjs.hash(req.body.password, salt);

  const user = new userModel({
    userName: req.body.userName,
    password: hashPassword,
    email: req.body.email,
    phone: req.body.phone,
  });

//   const doc = await user.save();

//   console.log("[+] Saved user to the db...");
//   try {
//     const singnUpUrl = "http://localhost:5000/signup";
//     console.log(singnUpUrl);

//     sendMailVerification(doc.email, singnUpUrl)
//       .then(() => {
//         res.status(200).json({
//           message: "User added success",
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//         res.status(400).json({
//           Error: err,
//         });
//       });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({
//       Error: "Failed sending mail : " + error,
//     });
//   }
};
