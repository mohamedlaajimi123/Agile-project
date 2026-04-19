const router = require("express").Router();
const adminController = require("../controllers/adminController");
const { protect, authorize } = require("../middlewares/authMiddleware");

/**
 * @swagger
 * /admin/dashboard:
 *   get:
 *     summary: Get admin dashboard stats
 *     tags: [Admin]
 */
router.get(
  "/dashboard",
  protect,
  authorize("admin"),
  adminController.getDashboard
);

router.get("/sync", protect, authorize("admin"), adminController.getSyncStatus);
router.post("/sync", protect, authorize("admin"), adminController.triggerSync);

module.exports = router;