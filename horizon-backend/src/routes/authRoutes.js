const router = require("express").Router();
const authController = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authenticate user and return JWT token
 *     tags: [Auth]
 *     description: Login using email and password to receive a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@test.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Successful authentication
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", authController.login);

// ✅ FIXED LINE
router.get("/me", protect, authController.getMe);

module.exports = router;