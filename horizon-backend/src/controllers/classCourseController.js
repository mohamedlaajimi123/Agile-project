const Model = require("../models/classCourseModel");

exports.assignCourse = async (req, res, next) => {
  try {
    const { class_id, course_id } = req.body;

    const data = await Model.assignCourse(class_id, course_id);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

exports.getClassCourses = async (req, res, next) => {
  try {
    const data = await Model.getClassCourses(req.params.classId);
    res.json(data);
  } catch (err) {
    next(err);
  }
};