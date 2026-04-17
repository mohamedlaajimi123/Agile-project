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

module.exports = router;