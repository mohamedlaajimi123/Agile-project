const router = require("express").Router();
const db = require("../config/db");
const { protect, authorize } = require("../middlewares/authMiddleware");
const logger = require("../utils/logger");

/**
 * @swagger
 * tags:
 *   name: AdminAnalytics
 *   description: Admin dashboard statistics
 */

/**
/**
 * @swagger
 * /api/admin/analytics:
 *   get:
 *     summary: Get admin analytics
 *     tags: [AdminAnalytics]
 */
logger.info("Admin analytics endpoint hit");
/*router.get(
    
  "/analytics",
  protect,
  authorize("admin"),
  async (req, res, next) => {
    try {
      // 🔹 Counts
      const students = await db.query("SELECT COUNT(*) FROM students");
      const courses = await db.query("SELECT COUNT(*) FROM courses");
      const classes = await db.query("SELECT COUNT(*) FROM classes");
      const exams = await db.query("SELECT COUNT(*) FROM exams");

      // 🔹 Average grade
      const avg = await db.query("SELECT AVG(score) FROM grades");

      // 🔹 Success rate (>10/20)
      const success = await db.query(`
        SELECT 
          COUNT(*) FILTER (WHERE score >= 10) * 100.0 / COUNT(*) AS success_rate
        FROM grades
      `);

      res.json({
        total_students: Number(students.rows[0].count),
        total_courses: Number(courses.rows[0].count),
        total_classes: Number(classes.rows[0].count),
        total_exams: Number(exams.rows[0].count),
        average_score: Number(avg.rows[0].avg || 0),
        success_rate: Number(success.rows[0].success_rate || 0),
      });
    } catch (err) {
      next(err);
    }
  }
);
*/
/*
router.get("/analytics", protect, authorize("admin"), async (req, res) => {
  console.log("Analytics test hit");
  res.json({ message: "OK" });
});

router.get("/analytics", async (req, res) => {
  console.log("🔥 NO AUTH TEST");
  res.json({ message: "WORKS WITHOUT AUTH" });
});
*/
router.get("/analytics", (req, res) => {
  logger.info("Analytics endpoint accessed");
  res.setHeader("Connection", "close");
  return res.status(200).json({
    message: "OK",
  });
});
module.exports = router;