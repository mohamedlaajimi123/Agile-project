const db = require("../config/db");

exports.getAllCourses = async () => {
  const result = await db.query("SELECT * FROM courses ORDER BY course_id");
  return result.rows;
};

exports.createCourse = async ({ title, code, credits, coefficient, description }) => {
  const result = await db.query(
    `INSERT INTO courses (title, code, credits, coefficient, description)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [title, code, credits, coefficient, description]
  );

  return result.rows[0];
};