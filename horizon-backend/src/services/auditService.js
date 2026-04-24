const pool = require("../config/db");

exports.logAction = async ({ user_id, action, entity, entity_id = null, details = {} }) => {
  try {
    await pool.query(
      `INSERT INTO audit_logs (user_id, action, entity, entity_id, details)
       VALUES ($1, $2, $3, $4, $5)`,
      [user_id, action, entity, entity_id, details]
    );
  } catch (err) {
    console.error("Audit logging failed:", err.message || err);
  }
};
