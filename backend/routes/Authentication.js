const { Router } = require("express");
const router = Router();
const {
  inputValidation,
  emailValidation,
  userNameCheck,
} = require("../middleware/Authentication");
const jwt = require("jsonwebtoken");
const TodoApp = require("../db/Todos");
const { secreatKey } = require("../config");

router.post(
  "/sign-up",
  inputValidation,
  emailValidation,
  userNameCheck,
  async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    console.log(email);
    await TodoApp.create({
      mail: email,
      username,
      password,
    });

    return res.status(201).json({
      message: "sucessfully Created User",
      value: true,
      authorization: jwt.sign(
        { username, expiry: Date.now() + 3600 * 1000 },
        secreatKey,
      ),
    });
  },
);

router.get("/authorization", async (req, res) => {
  try {
    if (!req.headers["authorization"])
      return res.json({
        message: "no authorization key provided",
        value: false,
      });
    const result = jwt.verify(req.headers.authorization, secreatKey);
    console.log(result);
    console.log(result.expiry, Date.now());
    if (result.expiry < Date.now())
      return res.json({ message: "Authorization was expired", value: false });
    return res
      .status(200)
      .json({ message: "valid authorization key", value: true });
  } catch (err) {
    console.log(`the error ws ${err}`);
    return res.json({ message: "invalid authorization key", value: false });
  }
});

router.post("/sign-in", inputValidation, async (req, res) => {
  console.log("welcome to sign in");
  const password = req.body.password;
  const username = req.body.username;

  const result = await TodoApp.findOne({ username, password });
  if (result)
    return res.json({
      message: "user Exists",
      value: true,
      authorization: jwt.sign(
        { username, expiry: Date.now() + 3600 * 1000 },
        secreatKey,
      ),
    });

  return res.json({ message: "user doesn't exists", value: false });
});

module.exports = router;
