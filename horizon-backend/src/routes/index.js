const router = require("express").Router();
const pool = require("../config/db");
const logger = require("../utils/logger");

const courseRoutes = require("./courseRoutes");
const classCourseRoutes = require("./classCourseRoutes");
const classRoutes = require("./classRoutes");

// Health check endpoint
router.get("/health", async (req, res) => {
  try {
    // Check database connectivity
    await pool.query('SELECT 1');
    logger.info('Health check passed');
    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'connected'
      }
    });
  } catch (error) {
    logger.error('Health check failed', { error: error.message });
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      services: {
        database: 'disconnected'
      },
      error: process.env.NODE_ENV === 'development' ? error.message : 'Service unavailable'
    });
  }
});

router.use("/admin", require("./adminAnalyticsRoutes"));
router.use("/student", require("./studentDashboardRoutes"));
router.use("/grades", require("./gradeRoutes"));
router.use("/exams", require("./examRoutes"));
router.use("/courses", courseRoutes);
router.use("/auth", require("./authRoutes"));
router.use("/users", require("./userRoutes"));
router.use("/students", require("./studentRoutes"));
router.use("/admin", require("./adminRoutes"));
router.use("/professor", require("./professorRoutes"));
router.use("/class-courses", classCourseRoutes);
router.use("/classes", classRoutes);
router.use("/student-classes", require("./studentClassRoutes"));
module.exports = router;