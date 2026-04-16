// src/models/userModel.js
const pool = require("../config/db");

// Find user by email (used for login)
exports.findByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  return result.rows[0];
};

// Create new user
exports.createUser = async (user) => {
  const { full_name, email, password_hash, role } = user;

  const result = await pool.query(
    `INSERT INTO users (full_name, email, password_hash, role)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [full_name, email, password_hash, role]
  );

  return result.rows[0];
};

// Get all users
exports.getAllUsers = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};