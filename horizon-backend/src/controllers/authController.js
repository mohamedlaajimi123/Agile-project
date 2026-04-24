const authService = require("../services/authService");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await authService.login(email, password);

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