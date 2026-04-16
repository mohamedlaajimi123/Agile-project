const router = require("express").Router();

router.use("/auth", require("./authRoutes"));
router.use("/users", require("./userRoutes"));
router.use("/students", require("./studentRoutes"));
router.use("/admin", require("./adminRoutes"));
router.use("/professor", require("./professorRoutes"));
module.exports = router;