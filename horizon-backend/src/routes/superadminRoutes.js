const router = require("express").Router();
const { protect, authorize } = require("../middlewares/authMiddleware");

// GET /api/superadmin/dashboard
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