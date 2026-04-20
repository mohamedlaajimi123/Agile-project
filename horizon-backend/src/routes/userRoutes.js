const router = require("express").Router();
const userController = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");
const validateRequest = require("../middlewares/validateRequest");
const { signupSchema } = require("../schemas/authSchemas");

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user (signup)
 *     tags: [Users]
 *     description: Register a new user with full name, email, password, and role.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [full_name, email, password, role]
 *             properties:
 *               full_name:
 *                 type: string
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: john@example.com
 *               password:
 *                 type: string
 *                 minLength: 6
 *                 example: password123
 *               role:
 *                 type: string
 *                 enum: [student, professor, admin, superadmin]
 *                 example: student
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Internal server error
 */
router.post("/", validateRequest(signupSchema), userController.createUser);
router.get("/", protect, userController.getUsers);

module.exports = router;