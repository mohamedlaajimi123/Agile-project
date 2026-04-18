const router = require("express").Router();
const db = require("../config/db");
const { protect, authorize } = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: StudentClasses
 *   description: Manage student-class relationships
 */

/**
 * @swagger
 * /student-classes:
 *   post:
 *     summary: Assign a student to a class
 *     tags: [StudentClasses]
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
 *               - class_id
 *             properties:
 *               student_id:
 *                 type: integer
 *                 example: 1
 *               class_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Student assigned to class
 */
router.post("/", protect, authorize("admin"), async (req, res, next) => {
  try {
    const { student_id, class_id } = req.body;

    if (!student_id || !class_id) {
      return res.status(400).json({
        error: "student_id and class_id are required",
      });
    }

    const result = await db.query(
      `INSERT INTO student_classes (student_id, class_id)
       VALUES ($1, $2)
       RETURNING *`,
      [student_id, class_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /student-classes/{classId}:
 *   get:
 *     summary: Get students in a class
 *     tags: [StudentClasses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: classId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: List of students
 */
router.get("/:classId", protect, async (req, res, next) => {
  try {
    const result = await db.query(
      `SELECT s.*, u.full_name, u.email
       FROM student_classes sc
       JOIN students s ON sc.student_id = s.student_id
       JOIN users u ON s.user_id = u.user_id
       WHERE sc.class_id = $1`,
      [req.params.classId]
    );

    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

module.exports = router;