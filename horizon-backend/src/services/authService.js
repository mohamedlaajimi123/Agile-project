// src/services/authService.js
const userModel = require("../models/userModel");
const { generateToken } = require("../utils/jwt");

exports.login = async (email, password) => {
  const user = await userModel.findByEmail(email);

  if (!user) throw new Error("User not found");

  if (user.password_hash !== password) throw new Error("Invalid credentials");

  const token = generateToken(user);

  return { user, token };
};