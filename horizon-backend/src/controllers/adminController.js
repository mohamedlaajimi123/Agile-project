// src/controllers/adminController.js
const pool = require("../config/db");
const logger = require('../utils/logger');

exports.getDashboard = async (req, res, next) => {
  try {
    const users = await pool.query("SELECT COUNT(*) FROM users");
    const students = await pool.query("SELECT COUNT(*) FROM students");

    res.json({
      total_users: users.rows[0].count,
      total_students: students.rows[0].count,
    });
  } catch (err) {
    next(err);
  }
};

exports.getSyncStatus = async (req, res, next) => {
  try {
    // Mock sync status - in real implementation, check actual sync state
    res.json({
      lastSync: new Date().toISOString(),
      status: "completed",
      recordsSynced: 150
    });
  } catch (err) {
    next(err);
  }
};

exports.triggerSync = async (req, res, next) => {
  try {
    // Mock sync operation - in real implementation, perform actual sync
    // Simulate async operation
    setTimeout(() => {
      logger.info("Admin data sync completed");
    }, 2000);

    res.json({
      message: "Sync initiated successfully",
      status: "in_progress"
    });
  } catch (err) {
    next(err);
  }
};