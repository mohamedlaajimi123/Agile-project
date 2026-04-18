const router = require("express").Router();
const db = require("../config/db");
const { protect, authorize } = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Exams
 *   description: Manage exams
 */

/**
 * @swagger
 * /exams:
 *   post:
 *     summary: Create an exam
 *     tags: [Exams]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - course_id
 *               - class_id
 *               - exam_date
 *             properties:
 *               title:
 *                 type: string
 *                 example: Midterm Exam
 *               course_id:
 *                 type: integer
 *                 example: 1
 *               class_id:
 *                 type: integer
 *                 example: 1
 *               exam_date:
 *                 type: string
 *                 format: date
 *                 example: 2026-01-15
 *               max_score:
 *                 type: integer
 *                 example: 20
 */
router.post("/", protect, authorize("admin"), async (req, res, next) => {
  try {
    const { title, course_id, class_id, exam_date, max_score } = req.body;

    if (!title || !course_id || !class_id || !exam_date) {
      return res.status(400).json({
        error: "Missing required fields",
      });
    }

    const result = await db.query(
      `INSERT INTO exams (title, course_id, class_id, exam_date, max_score)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [title, course_id, class_id, exam_date, max_score || 20]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /exams:
 *   get:
 *     summary: Get all exams
 *     tags: [Exams]
 *     security:
 *       - bearerAuth: []
 */
router.get("/", protect, async (req, res, next) => {
  try {
    const result = await db.query(`
      SELECT e.*, c.title AS course, cl.name AS class
      FROM exams e
      JOIN courses c ON e.course_id = c.course_id
      JOIN classes cl ON e.class_id = cl.class_id
      ORDER BY exam_date
    `);

    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

module.exports = router;