// src/models/studentModel.js

const pool = require("../config/db");

// Create student
exports.createStudent = async (data) => {
  const { user_id, student_code } = data;

  const result = await pool.query(
    `INSERT INTO students (user_id, student_code)
     VALUES ($1, $2)
     RETURNING *`,
    [user_id, student_code]
  );

  return result.rows[0];
};

// Get all students with user info (JOIN)
exports.getAllStudents = async () => {
  const result = await pool.query(
    `SELECT s.*, u.full_name, u.email
     FROM students s
     JOIN users u ON s.user_id = u.user_id`
  );

  return result.rows;
};