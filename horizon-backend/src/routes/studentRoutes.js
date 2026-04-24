const router = require("express").Router();
const studentController = require("../controllers/studentController");
const { protect, authorize } = require("../middlewares/authMiddleware");

/**
 * @swagger
 * /students/dashboard:
 *   get:
 *     summary: Get student dashboard.
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Student dashboard data returned successfully.
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
  studentController.getDashboard
);

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Get all students.
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of student profiles.
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/", protect, authorize("admin"), studentController.getStudents);

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Create a student.
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [full_name, email, role]
 *             properties:
 *               full_name:
 *                 type: string
 *                 example: Jane Student
 *               email:
 *                 type: string
 *                 format: email
 *                 example: jane.student@example.com
 *               role:
 *                 type: string
 *                 example: student
 *     responses:
 *       200:
 *         description: Student created successfully.
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.post("/", protect, authorize("admin"), studentController.createStudent);

/**
 * @swagger
 * /students/me:
 *   get:
 *     summary: Get current student profile.
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Current student profile returned successfully.
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/me", protect, studentController.getMyProfile);

module.exports = router;