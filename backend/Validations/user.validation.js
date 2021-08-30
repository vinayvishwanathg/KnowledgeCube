const joi = require("joi");

var logger = require("../Controllers/logger").Logger;

var userValidation = (exports.userValidation = {});

const studentSchema = joi.object({
  userName: joi.string().alphanum().min(5).max(1024).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

userValidation.student = function (req, res, next) {
  try {
    const value = await studentSchema.validateAsync({
      userName: req.userName,
      password: req.password,
      email: req.email,
    });
    console.log("[+] Validation Success...");
    logger.debug("[+] Validation success...");
  } catch (err) {
    console.log("[-] Error in Validation : " + err);
    logger.error("Validation Error : " + err);
  }
};
