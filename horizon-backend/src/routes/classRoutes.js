const router = require("express").Router();
const controller = require("../controllers/classController");
const { protect, authorize } = require("../middlewares/authMiddleware");

/**
 * @swagger
 * /classes:
 *   get:
 *     summary: Get all classes
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of classes
 *
 *   post:
 *     summary: Create a class
 *     tags: [Classes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - semester_id
 *             properties:
 *               name:
 *                 type: string
 *                 example: L2-INFO-A
 *               semester_id:
 *                 type: integer
 *                 example: 1
 *               capacity:
 *                 type: integer
 *                 example: 40
 *     responses:
 *       201:
 *         description: Class created
 */

// GET all classes
router.get("/", protect, authorize("admin"), controller.getClasses);

// CREATE class
router.post("/", protect, authorize("admin"), controller.createClass);

module.exports = router;