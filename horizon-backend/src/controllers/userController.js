// src/controllers/userController.js
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res, next) => {
  try {
    const { full_name, email, password, role } = req.body;

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.createUser({
      full_name,
      email,
      password_hash: hash,
      role,
    });

    res.json(user);
  } catch (err) {
    next(err);
  }
};

// backend/src/controllers/userController.js

exports.getUsers = (req, res) => {
  res.json({ message: "Users working" });
};