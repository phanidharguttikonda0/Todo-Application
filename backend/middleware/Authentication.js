const jwt = require("jsonwebtoken");
const { z } = require("zod");
const TodoApp = require("../db/Todos");

async function inputValidation(req, res, next) {
  console.log("welcome input validation");
  const username = req.body.username;
  const password = req.body.password;

  const passwordSchema = z.string().min(8).max(18);
  const usernameSchema = z.string().min(3).max(18);
  if (passwordSchema.safeParse(password).success) {
    if (usernameSchema.safeParse(username).success) {
      return next();
    } else {
      return res.json({
        message: "Invalid Username min of length 3",
        value: false,
      });
    }
  } else {
    return res.json({
      message: "password must have min of length 8",
      value: false,
    });
  }
}

async function emailValidation(req, res, next) {
  const email = req.body.email;
  const emailSchema = z.string().email();
  if (emailSchema.safeParse(email).success) {
    return next();
  }
  return res.json({ message: "invalid", value: false });
}

async function userNameCheck(req, res, next) {
  const result = await TodoApp.findOne({ username: req.body.username });
  console.log(result);
  if (result === null) {
    const result2 = await TodoApp.findOne({ mail: req.body.email });
    if (result2 === null) {
      return next();
      // the next() method should be the last line of any execution, else after the main request completes
      // it's execute the below code , so we need to be carefull
    } else return res.json({ message: "Email Already exists", value: false });
  }
  return res.json({ message: "Username Already exists", value: false });
}

module.exports = { inputValidation, emailValidation, userNameCheck };
