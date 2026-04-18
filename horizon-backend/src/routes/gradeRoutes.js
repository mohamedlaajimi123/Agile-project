const router = require("express").Router();
const db = require("../config/db");
const { protect, authorize } = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Grades
 *   description: Manage student grades
 */

/**
 * @swagger
 * /grades:
 *   post:
 *     summary: Assign grade to student
 *     tags: [Grades]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - student_id
 *               - exam_id
 *               - score
 *             properties:
 *               student_id:
 *                 type: integer
 *                 example: 1
 *               exam_id:
 *                 type: integer
 *                 example: 1
 *               score:
 *                 type: number
 *                 example: 15.5
 */
router.post("/", protect, authorize("admin"), async (req, res, next) => {
  try {
    const { student_id, exam_id, score } = req.body;

    if (!student_id || !exam_id || score === undefined) {
      return res.status(400).json({
        error: "student_id, exam_id and score are required",
      });
    }

    const result = await db.query(
      `INSERT INTO grades (student_id, exam_id, score)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [student_id, exam_id, score]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /grades:
 *   get:
 *     summary: Get all grades
 *     tags: [Grades]
 *     security:
 *       - bearerAuth: []
 */
router.get("/", protect, async (req, res, next) => {
  try {
    const result = await db.query(`
      SELECT g.*, u.full_name, e.title AS exam
      FROM grades g
      JOIN students s ON g.student_id = s.student_id
      JOIN users u ON s.user_id = u.user_id
      JOIN exams e ON g.exam_id = e.exam_id
    `);

    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

module.exports = router;