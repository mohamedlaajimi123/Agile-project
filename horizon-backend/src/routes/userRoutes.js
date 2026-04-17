const router = require("express").Router();
const userController = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

router.get("/", protect, userController.getUsers);

module.exports = router;