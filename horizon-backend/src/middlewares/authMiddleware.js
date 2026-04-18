const jwt = require("jsonwebtoken");

// 🔐 Protect
exports.protect = (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        error: "Not authorized, token missing",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    return next(); // ✅ ALWAYS return next
  } catch (err) {
    return res.status(401).json({
      error: "Not authorized, invalid token",
    });
  }
};

// 🔒 Authorize
exports.authorize = (...roles) => {
  return (req, res, next) => {
    console.log("User role:", req.user?.role);

    if (!req.user) {
      return res.status(401).json({
        error: "No user found",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        error: "Forbidden: not allowed",
      });
    }

    return next(); // 🔥 VERY IMPORTANT
  };
};