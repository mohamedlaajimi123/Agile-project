const router = require("express").Router();
const db = require("../config/db");
const { protect, authorize } = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: ClassCourses
 *   description: Manage class-course relationships
 */

/**
 * @swagger
 * /class-courses:
 *   post:
 *     summary: Assign a course to a class
 *     tags: [ClassCourses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - class_id
 *               - course_id
 *             properties:
 *               class_id:
 *                 type: integer
 *                 example: 1
 *               course_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Course assigned to class
 *       400:
 *         description: Missing data
 *       403:
 *         description: Forbidden
 */
router.post("/", protect, authorize("admin"), async (req, res, next) => {
  try {
    const { class_id, course_id } = req.body;

    if (!class_id || !course_id) {
      return res.status(400).json({
        error: "class_id and course_id are required",
      });
    }

    const result = await db.query(
      `INSERT INTO class_courses (class_id, course_id)
       VALUES ($1, $2)
       RETURNING *`,
      [class_id, course_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /class-courses/{classId}:
 *   get:
 *     summary: Get all courses assigned to a class
 *     tags: [ClassCourses]
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
 *         description: List of courses
 */
router.get("/:classId", protect, async (req, res, next) => {
  try {
    const result = await db.query(
      `SELECT c.*
       FROM class_courses cc
       JOIN courses c ON cc.course_id = c.course_id
       WHERE cc.class_id = $1`,
      [req.params.classId]
    );

    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

module.exports = router;