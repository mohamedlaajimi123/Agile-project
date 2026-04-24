const router = require("express").Router();
const db = require("../config/db");
const { protect, authorize } = require("../middlewares/authMiddleware");
const { audit } = require("../middlewares/auditMiddleware");

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
  audit("VIEW_SUPERADMIN_DASHBOARD", "dashboard"),
  (req, res) => {
    res.json({
      message: "Superadmin dashboard working",
      user: req.user,
    });
  }
);

/**
 * @swagger
 * /superadmin/audit-logs:
 *   get:
 *     summary: Get recent audit logs.
 *     tags: [SuperAdmin]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recent audit entries.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       401:
 *         $ref: '#/components/responses/UnauthorizedError'
 *       403:
 *         $ref: '#/components/responses/ForbiddenError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get(
  "/audit-logs",
  protect,
  authorize("superadmin"),
  audit("VIEW_AUDIT_LOGS", "audit_logs"),
  async (req, res, next) => {
    try {
      const result = await db.query(
        `SELECT id, user_id, action, entity, entity_id, details, created_at
         FROM audit_logs
         ORDER BY created_at DESC
         LIMIT 200`
      );

      res.json(result.rows);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;