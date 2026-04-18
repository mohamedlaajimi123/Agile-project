// src/middlewares/errorMiddleware.js


module.exports = (err, req, res, next) => {
  console.error("❌ ERROR:", err);

  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
};