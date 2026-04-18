const db = require("../config/db");

// ✅ Get all classes with semester + academic year
exports.getClasses = async (req, res, next) => {
  try {
    const result = await db.query(`
      SELECT c.*, s.name AS semester, ay.name AS academic_year
      FROM classes c
      JOIN semesters s ON c.semester_id = s.semester_id
      JOIN academic_years ay ON s.academic_year_id = ay.academic_year_id
      ORDER BY c.class_id
    `);

    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};

// ✅ Create class
exports.createClass = async (req, res, next) => {
  try {
    const { name, semester_id, capacity } = req.body;

    // Basic validation
    if (!name || !semester_id) {
      return res.status(400).json({
        error: "name and semester_id are required",
      });
    }

    const result = await db.query(
      `INSERT INTO classes (name, semester_id, capacity)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [name, semester_id, capacity || 30]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
};