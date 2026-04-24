const router = require("express").Router();
const { protect, authorize } = require("../middlewares/authMiddleware");

/**
 * @swagger
 * /superadmin/dashboard:
 *   get:
 *     summary: Get superadmin dashboard data.
 *     tags: [SuperAdmin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Superadmin dashboard data returned successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 user:
 *                   $ref: '#/components/schemas/User'
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
  authorize("superadmin"),
  (req, res) => {
    res.json({
      message: "Superadmin dashboard working",
      user: req.user,
    });
  }
);

module.exports = router;