const joi = require("joi");

var logger = require("../Controllers/logger").Logger;

var userValidation = (exports.userValidation = {});


//signUp validation
const userSchema = joi.object({
  userName: joi.string().alphanum().min(5).max(1024).required(),
  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).length(8),
  email: joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: joi
    .string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  isTeacher: joi.boolean(),
});

userValidation.student = async function (req, res, next) {
  try {
    const value = await userSchema.validateAsync({
      userName: req.body.userName,
      password: req.body.password,
      email: req.body.email,
      phone: req.body.phone,
      isTeacher: false,
    });
    console.log("[+] Validation Success...");
    logger.debug("[+] Validation success...");
    next();
  } catch (err) {
    console.log("[-] Error in Validation : " + err);
    logger.error("Validation Error : " + err);
    res.status(400).json({
      Error: "Validation failed...",
    });
  }
};

userValidation.teacher = async function (req, res, next) {
  try {
    const value = await userSchema.validateAsync({
      userName: req.body.userName,
      password: req.body.password,
      email: req.body.email,
      phone: req.body.phone,
      isTeacher: true,
    });
    console.log("[+] Validation Success...");
    logger.debug("[+] Validation success...");
    next();
  } catch (err) {
    console.log("[-] Error in Validation : " + err);
    logger.error("Validation Error : " + err);
    res.status(400).json({
      Error: "Validation failed...",
    });
  }
};


//logging validation
const userLoggingSchema = joi.object({
  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).length(8),
  email: joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

userValidation.logging = async function (req, res, next) {
  try {
    const value = await userLoggingSchema.validateAsync({
      password: req.body.password,
      email: req.body.email,
    });
    console.log("[+] Validation Success...");
    logger.debug("[+] Validation success...");
    next();
  } catch (err) {
    console.log("[-] Error in Validation : " + err);
    logger.error("Validation Error : " + err);
    res.status(400).json({
      Error: "Validation failed...",
    });
  }
};

userValidation.teacherLogging = async function (req, res, next) {
  try {
    const value = await userLoggingSchema.validateAsync({
      password: req.body.password,
      email: req.body.email,
    });
    console.log("[+] Validation Success...");
    logger.debug("[+] Validation success...");
    next();
  } catch (err) {
    console.log("[-] Error in Validation : " + err);
    logger.error("Validation Error : " + err);
    res.status(400).json({
      Error: "Validation failed...",
    });
  }
};