const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashed
    });

    res.redirect("/login");
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) return res.send("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return res.send("Invalid credentials");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.cookie("token", token);
    res.redirect("/tasks");
  } catch (err) {
    next(err);
  }
};