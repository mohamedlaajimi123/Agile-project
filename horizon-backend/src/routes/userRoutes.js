const router = require("express").Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/authMiddleware");

router.post("/", userController.createUser);
router.get("/", auth, userController.getUsers);

module.exports = router; // 🔥 MUST EXIST