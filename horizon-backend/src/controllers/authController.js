const authService = require("../services/authService");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { user, token } = await authService.login(email, password);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.user_id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(401).json({
      error: err.message,
    });
  }
};

exports.getMe = async (req, res) => {
  res.json({
    user: req.user,
  });
};