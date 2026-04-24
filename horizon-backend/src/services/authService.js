const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

exports.login = async (email, password) => {
  // 🔹 Get user from DB
  const result = await db.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  const user = result.rows[0];

  // 🔴 FIX 1 — Check user exists
  if (!user) {
    throw new Error("Invalid credentials");
  }

  // 🔴 FIX 2 — Check password exists
  if (!user.password) {
    throw new Error("User password missing in DB");
  }

  // 🔴 FIX 3 — Compare safely
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  // 🔹 Generate token
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role
    }
  };
};