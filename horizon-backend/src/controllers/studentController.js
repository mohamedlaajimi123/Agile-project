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