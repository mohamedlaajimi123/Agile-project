const Course = require("../models/courseModel");

exports.getCourses = async (req, res, next) => {
  try {
    const courses = await Course.getAllCourses();
    res.json(courses);
  } catch (err) {
    next(err);
  }
};

exports.createCourse = async (req, res, next) => {
  try {
    const course = await Course.createCourse(req.body);
    res.status(201).json(course);
  } catch (err) {
    next(err);
  }
};