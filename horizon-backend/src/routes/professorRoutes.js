const router = require("express").Router();
const professorController = require("../controllers/professorController");
const { protect, authorize } = require("../middlewares/authMiddleware");

/**
 * @swagger
 * /professor/dashboard:
 *   get:
 *     summary: Get professor dashboard data.
 *     tags: [Professor]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Professor dashboard data returned successfully.
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
  authorize("professor"),
  professorController.getDashboard
);
router.get(
  "/my-courses",
  protect,
  authorize("professor"),
  professorController.getMyCourses
);
router.get("/sync", protect, authorize("professor"), professorController.getSyncStatus);
router.post("/sync", protect, authorize("professor"), professorController.triggerSync);

module.exports = router;