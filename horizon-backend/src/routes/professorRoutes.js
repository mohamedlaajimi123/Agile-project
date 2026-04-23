const router = require("express").Router();
const professorController = require("../controllers/professorController");
const { protect, authorize } = require("../middlewares/authMiddleware");

/**
 * @swagger
 * /professor/dashboard:
 *   get:
 *     summary: Get professor dashboard
 *     tags: [Professor]
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