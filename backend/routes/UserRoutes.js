var express = require("express");
var router = express.Router();
var user = require("../models/UserCredController");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
require("dotenv").config();
var auth = require("../middleware/auth");

router.post("/register", async (req, res) => {
  try {
    const name = req.body.username;
    const pass = req.body.password;

    const existingUser = await user.findOne({ userName: name });
    if (existingUser) {
      return res.send(false).json({
        message: "An account with this user already exists!",
      });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(pass, salt);

    const newUser = new user({
      userName: name,
      passWord: hashedPassword,
    });

    const saveUser = await newUser.save();

    return res.send(true);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const name = req.body.username;
    const pass = req.body.password;

    const User = await user.findOne({ userName: name });

    if (!User) {
      return res.status(400).json({
        message: "No account with this user exists",
      });
    }

    const isMatch = await bcrypt.compare(pass, User.passWord);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign({ id: User._id }, process.env.JWT_PASS);
    return res.json({
      token,
      user: {
        id: User._id,
        displayName: User.userName,
      },
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
});

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_PASS);
    if (!verified) return res.json(false);

    const User = await user.findById(verified.id);
    if (!User) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/getUserData", auth, async (req, res) => {
  const User = await user.findById(req.user);
  return res.json({
    id: User._id,
    memeberName: User.userName,
  });
});
module.exports = router;
