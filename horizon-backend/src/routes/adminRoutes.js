const router = require("express").Router();
const adminController = require("../controllers/adminController");
const { protect, authorize } = require("../middlewares/authMiddleware");

<<<<<<< HEAD
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
=======
router.get("/dashboard", auth, role(["admin"]), adminController.getDashboard);
router.get("/sync", auth, role(["admin"]), adminController.getSyncStatus);
router.post("/sync", auth, role(["admin"]), adminController.triggerSync);
>>>>>>> 56be6afd1916d87f315e3ec5363ccc5756b2fbdf

module.exports = router;