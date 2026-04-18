const router = require("express").Router();
const controller = require("../controllers/classCourseController");
const { protect, authorize } = require("../middlewares/authMiddleware");

// assign
router.post("/", protect, authorize("admin"), controller.assignCourse);

// get courses of class
router.get("/:classId", protect, controller.getClassCourses);

module.exports = router;