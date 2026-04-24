const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");

// 🔐 Protect middleware
exports.protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token) {
      return res.status(401).json({ error: "Not authorized, token missing" });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      logger.error("JWT_SECRET is not configured");
      return res.status(500).json({ error: "Server misconfiguration" });
    }

    const decoded = jwt.verify(token, secret);

    req.user = decoded;
    return next();
  } catch (err) {
    logger.warn("JWT verification failed", { message: err.message });
    return res.status(401).json({ error: "Not authorized, invalid token" });
  }
};

// 🔒 Authorize middleware
exports.authorize = (...roles) => {
  return (req, res, next) => {
    logger.debug("User role check", { role: req.user?.role, allowedRoles: roles });

    if (!req.user) {
      return res.status(401).json({ error: "Not authorized" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Forbidden: not allowed" });
    }

    return next();
  };
};