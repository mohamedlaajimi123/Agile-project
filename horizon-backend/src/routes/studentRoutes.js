const router = require("express").Router();
const studentController = require("../controllers/studentController");
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");
// 🔒 Protected routes
router.post("/", auth, role(["admin"]), studentController.createStudent);router.get("/", auth, studentController.getStudents);
router.get("/me", auth, role(["student"]), studentController.getMyProfile);
module.exports = router;




