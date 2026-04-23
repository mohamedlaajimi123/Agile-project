const router = require("express").Router();
const studentController = require("../controllers/studentController");
const { protect, authorize } = require("../middlewares/authMiddleware");

/**
 * @swagger
 * /students/dashboard:
 *   get:
 *     summary: Get student dashboard
 *     tags: [Students]
 */
router.get(
  "/dashboard",
  protect,
  authorize("student"),
  studentController.getDashboard
);

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Get all students
 *     tags: [Students]
 */
router.get("/", protect, authorize("admin"), studentController.getStudents);

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Create a student
 *     tags: [Students]
 */
router.post("/", protect, authorize("admin"), studentController.createStudent);

/**
 * @swagger
 * /students/me:
 *   get:
 *     summary: Get current student profile
 *     tags: [Students]
 */
router.get("/me", protect, studentController.getMyProfile);

module.exports = router;