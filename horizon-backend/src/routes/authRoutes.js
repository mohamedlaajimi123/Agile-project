const router = require("express").Router();
const authController = require("../controllers/authController");

// ✅ ONLY LOGIN FOR NOW
router.post("/login", authController.login);

module.exports = router;