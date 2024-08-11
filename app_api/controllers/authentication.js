const mongoose = require("mongoose");
const User = require("../models/user");
const passport = require("passport");

const register = async (req, res) => {
  // Validate required fields
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const user = new User({
    name: req.body.name, // set user name
    email: req.body.email, // set e-mail
    password: "", // start with empty password
  });

  user.setPassword(req.body.password); // set user password

  try {
    const q = await user.save();
    if (!q) {
      return res.status(400).json({ message: "Error saving user" });
    } else {
      const token = user.generateJWT(); // return new user token
      return res.status(200).json({ token });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error registering user", error: err });
  }
};

const login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({ message: "All fields required" });
  }
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(404).json(err);
    }
    if (user) {
      const token = user.generateJWT();
      return res.status(200).json({ token });
    } else {
      res.status(401).json(info);
    }
  })(req, res);
};

module.exports = {
  register,
  login, // Ensure the login function is properly exported
};
