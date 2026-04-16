const pool = require("../config/db");

exports.getDashboard = async (req, res, next) => {
  try {
    const users = await pool.query("SELECT COUNT(*) FROM users");
    const students = await pool.query("SELECT COUNT(*) FROM students");

    res.json({
      total_users: users.rows[0].count,
      total_students: students.rows[0].count,
    });
  } catch (err) {
    next(err);
  }
};