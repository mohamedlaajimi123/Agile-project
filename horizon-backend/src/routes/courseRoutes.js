const router = require("express").Router();
const db = require("../config/db");
const { protect, authorize } = require("../middlewares/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Manage courses
 */

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 */
router.get("/", protect, async (req, res, next) => {
  try {
    const result = await db.query("SELECT * FROM courses ORDER BY course_id");
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Create a course
 *     tags: [Courses]
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
 *               - code
 *             properties:
 *               title:
 *                 type: string
 *                 example: Databases
 *               code:
 *                 type: string
 *                 example: DB101
 *               credits:
 *                 type: integer
 *                 example: 4
 *               coefficient:
 *                 type: integer
 *                 example: 2
 *               description:
 *                 type: string
 *                 example: Intro to databases
 */
router.post("/", protect, authorize("admin"), async (req, res, next) => {
  try {
    const { title, code, credits, coefficient, description } = req.body;

    if (!title || !code) {
      return res.status(400).json({
        error: "title and code are required",
      });
    }

    const result = await db.query(
      `INSERT INTO courses (title, code, credits, coefficient, description)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [title, code, credits || 3, coefficient || 1, description]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

module.exports = router;