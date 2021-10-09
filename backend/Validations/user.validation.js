const joi = require("joi");

var logger = require("../Controllers/logger").Logger;

var userValidation = (exports.userValidation = {});

const studentSchema = joi.object({
  userName: joi.string().alphanum().min(5).max(1024).required(),
  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  email: joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: joi.string().length(10).pattern(/^[0-9]+$/).required(),
  isTeacher: joi.boolean()
});

userValidation.student = async function (req, res, next) {
  try {
    const value = await studentSchema.validateAsync({
      userName: req.body.userName,
      password: req.body.password,
      email: req.body.email,
      isTeacher: false
    });
    console.log("[+] Validation Success...");
    logger.debug("[+] Validation success...");
    next();
  } catch (err) {
    console.log("[-] Error in Validation : " + err);
    logger.error("Validation Error : " + err);
  }
};
