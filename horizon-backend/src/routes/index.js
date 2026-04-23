const router = require("express").Router();

// existing routes
const authRoutes = require("./authRoutes");
const professorRoutes = require("./professorRoutes");
const studentRoutes = require("./studentRoutes");
const adminRoutes = require("./adminRoutes");

// NEW
const superadminRoutes = require("./superadminRoutes");

// register routes
router.use("/auth", authRoutes);
router.use("/professor", professorRoutes);
router.use("/student", studentRoutes);
router.use("/admin", adminRoutes);

// NEW
router.use("/superadmin", superadminRoutes);

module.exports = router;