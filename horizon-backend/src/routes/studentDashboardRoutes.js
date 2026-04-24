const router = require("express").Router();
const db = require("../config/db");
const { protect, authorize } = require("../middlewares/authMiddleware");
const logger = require("../utils/logger");

/**
 * @swagger
 * tags:
 *   name: StudentDashboard
 *   description: Student dashboard data
 */

/**
 * @swagger
 * /student/dashboard:
 *   get:
 *     summary: Get student dashboard data
 *     tags: [StudentDashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard data returned successfully.
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get(
  "/dashboard",
  protect,
  authorize("student"),
  async (req, res, next) => {
    try {
      logger.debug("Dashboard request received", { userId: req.user?.id });

      // 🔥 IMPORTANT FIX (your token uses user_id, not id)
      const userId = req.user.id;
      logger.debug("Processing dashboard for user", { userId, user: req.user });

      // 🔹 1. Get student
      const studentRes = await db.query(
        `SELECT s.student_id, u.full_name, u.email
         FROM students s
         JOIN users u ON s.user_id = u.user_id
         WHERE s.user_id = $1`,
        [userId]
      );

      if (studentRes.rows.length === 0) {
        return res.status(404).json({
          error: "Student profile not found",
        });
      }

      const student = studentRes.rows[0];
      logger.debug("Student data retrieved", { student });

      // 🔹 2. Get classes
      const classRes = await db.query(
        `SELECT c.*
         FROM student_classes sc
         JOIN classes c ON sc.class_id = c.class_id
         WHERE sc.student_id = $1`,
        [student.student_id]
      );

      logger.debug("Classes retrieved", { classes: classRes.rows });

      // 🔹 3. Get courses
      const coursesRes = await db.query(
        `SELECT DISTINCT co.*
         FROM student_classes sc
         JOIN class_courses cc ON sc.class_id = cc.class_id
         JOIN courses co ON cc.course_id = co.course_id
         WHERE sc.student_id = $1`,
        [student.student_id]
      );

      logger.debug("Courses retrieved", { courses: coursesRes.rows });

      // 🔹 4. Get grades (with exams + course)
      const gradesRes = await db.query(
        `SELECT e.title AS exam, g.score, co.title AS course
         FROM grades g
         JOIN exams e ON g.exam_id = e.exam_id
         JOIN courses co ON e.course_id = co.course_id
         WHERE g.student_id = $1`,
        [student.student_id]
      );

      logger.debug("Grades retrieved", { grades: gradesRes.rows, userId: req.user.user_id, user: req.user });
      // ✅ Final response
      res.json({
        student,
        classes: classRes.rows,
        courses: coursesRes.rows,
        grades: gradesRes.rows,
      });

    } catch (err) {
      logger.error("Dashboard error", { error: err.message, stack: err.stack, userId: req.user?.id });
      next(err);
    }
  }
);

module.exports = router;