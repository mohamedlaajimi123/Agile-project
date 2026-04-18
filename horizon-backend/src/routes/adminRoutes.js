const router = require("express").Router();
const adminController = require("../controllers/adminController");
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

router.get("/dashboard", auth, role(["admin"]), adminController.getDashboard);
router.get("/sync", auth, role(["admin"]), adminController.getSyncStatus);
router.post("/sync", auth, role(["admin"]), adminController.triggerSync);

module.exports = router;