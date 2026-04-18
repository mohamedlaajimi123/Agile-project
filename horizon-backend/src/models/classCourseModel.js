const db = require("../config/db");

// assign course to class
exports.assignCourse = async (class_id, course_id) => {
  const result = await db.query(
    `INSERT INTO class_courses (class_id, course_id)
     VALUES ($1, $2)
     RETURNING *`,
    [class_id, course_id]
  );

  return result.rows[0];
};

// get courses of a class
exports.getClassCourses = async (class_id) => {
  const result = await db.query(
    `SELECT c.*
     FROM class_courses cc
     JOIN courses c ON cc.course_id = c.course_id
     WHERE cc.class_id = $1`,
    [class_id]
  );

  return result.rows;
};