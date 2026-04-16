// src/controllers/studentController.js

const studentModel = require("../models/studentModel");

// Create student
exports.createStudent = async (req, res, next) => {
  try {
    const { user_id, student_code } = req.body;

    // basic validation
    if (!user_id || !student_code) {
      return res.status(400).json({
        error: "user_id and student_code are required",
      });
    }

    const student = await studentModel.createStudent({
      user_id,
      student_code,
    });

    res.json(student);
  } catch (err) {
    next(err);
  }
};

// Get all students
exports.getStudents = async (req, res, next) => {
  try {
    const students = await studentModel.getAllStudents();
    res.json(students);
  } catch (err) {
    next(err);
  }
};
exports.getMyProfile = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const result = await require("../config/db").query(
      `SELECT s.*, u.full_name, u.email
       FROM students s
       JOIN users u ON s.user_id = u.user_id
       WHERE s.user_id = $1`,
      [userId]
    );

    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};