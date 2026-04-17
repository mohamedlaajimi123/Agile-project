const router = require("express").Router();
const controller = require("../controllers/courseController");
const { protect, authorize } = require("../middlewares/authMiddleware");

// Admin only
router.get("/", protect, authorize("admin"), controller.getCourses);
router.post("/", protect, authorize("admin"), controller.createCourse);

module.exports = router;