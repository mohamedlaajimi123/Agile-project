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

exports.getUsers = async (req, res, next) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};