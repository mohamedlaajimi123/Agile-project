const router = require("express").Router();
const professorController = require("../controllers/professorController");
const auth = require("../middlewares/authMiddleware");
const role = require("../middlewares/roleMiddleware");

router.get("/dashboard", auth, role(["professor"]), professorController.getDashboard);
router.get("/sync", auth, role(["professor"]), professorController.getSyncStatus);
router.post("/sync", auth, role(["professor"]), professorController.triggerSync);

module.exports = router;