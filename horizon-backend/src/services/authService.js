// src/services/authService.js
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const { generateToken } = require("../utils/jwt");

exports.login = async (email, password) => {
  const user = await userModel.findByEmail(email);

  if (!user) throw new Error("User not found");

  const match = await bcrypt.compare(password, user.password_hash);

  if (!match) throw new Error("Invalid credentials");

  const token = generateToken(user);

  return { user, token };
};