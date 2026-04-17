const jwt = require("jsonwebtoken");

// 🔐 PROTECT ROUTES (authentication)
exports.protect = (req, res, next) => {
  try {
    let token;

    // Check Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // No token
    if (!token) {
      return res.status(401).json({
        error: "Not authorized, token missing",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).json({
      error: "Not authorized, invalid token",
    });
  }
};

// 🔒 ROLE-BASED AUTHORIZATION
exports.authorize = (...roles) => {
  return (req, res, next) => {
    // Ensure user exists (protect must run first)
    if (!req.user) {
      return res.status(401).json({
        error: "Not authorized",
      });
    }

    // Check role
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: "Forbidden: insufficient permissions",
      });
    }

    next();
  };
};