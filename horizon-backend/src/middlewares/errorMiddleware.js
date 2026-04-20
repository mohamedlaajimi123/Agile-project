// src/middlewares/errorMiddleware.js
const logger = require('../utils/logger');

module.exports = (err, req, res, next) => {
  // Log the error with structured data
  logger.error('Unhandled error occurred', {
    message: err.message,
    stack: err.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString(),
  });

  // Don't send error details in production
  const isDevelopment = process.env.NODE_ENV !== 'production';
  const errorResponse = {
    success: false,
    error: {
      message: isDevelopment ? err.message : 'Internal Server Error',
      code: err.status || 500,
      timestamp: new Date().toISOString(),
    },
  };

  // Include stack trace in development
  if (isDevelopment) {
    errorResponse.error.stack = err.stack;
  }

  // If headers already sent, delegate to default Express error handler
  if (res.headersSent) {
    return next(err);
  }

  res.status(err.status || 500).json(errorResponse);
};