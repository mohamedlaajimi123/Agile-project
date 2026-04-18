const router = require("express").Router();
const professorController = require("../controllers/professorController");
const { protect, authorize } = require("../middlewares/authMiddleware");

<<<<<<< HEAD
/**
 * @swagger
 * /professor/dashboard:
 *   get:
 *     summary: Get professor dashboard
 *     tags: [Professor]
 */
router.get(
  "/dashboard",
  protect,
  authorize("professor"),
  professorController.getDashboard
);
=======
router.get("/dashboard", auth, role(["professor"]), professorController.getDashboard);
router.get("/sync", auth, role(["professor"]), professorController.getSyncStatus);
router.post("/sync", auth, role(["professor"]), professorController.triggerSync);
>>>>>>> 56be6afd1916d87f315e3ec5363ccc5756b2fbdf

module.exports = router;