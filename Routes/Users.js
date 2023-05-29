const express = require("express");
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");
const router = express();

const User = require("../Model/User");

router.post("/user/signup", async (req, res) => {
  console.log(req.body);
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Missing parameters" });
    }

    const userWithEmailReceived = await User.findOne({ email: email });

    if (userWithEmailReceived !== null) {
      return res.status(409).json({ message: "This email is already used" });
    }

    const token = uid2(64);
    const salt = uid2(16);
    const hash = SHA256(salt + password).toString(encBase64);

    const newUser = new User({
      email: email,
      username: username,

      token: token,
      salt: salt,
      hash: hash,
    });
    console.log(newUser);
    await newUser.save();
    res.json({
      _id: newUser._id,
      token: newUser.token,
      account: newUser.account,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/user/login", async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (user === null) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const newHash = SHA256(user.salt + password).toString(encBase64);
    console.log(newHash);

    if (newHash !== user.hash) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.json({
      _id: user._id,
      account: user.account,
      token: user.token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
