const authService = require("../services/authService");
const { logAction } = require("../services/auditService");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await authService.login(email, password);

    logAction({
      user_id: user.user_id,
      action: "LOGIN",
      entity: "user",
      entity_id: user.user_id,
      details: {
        method: req.method,
        route: req.originalUrl || req.url,
        ip: req.ip || req.connection?.remoteAddress || null,
      },
    });

    return res.json({
      message: "LOGIN SUCCESS",
      user: {
        id: user.user_id,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (err) {
    if (err.message === "Invalid credentials") {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    return next(err);
  }
};