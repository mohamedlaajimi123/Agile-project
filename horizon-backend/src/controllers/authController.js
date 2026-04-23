const pool = require("../config/db");

exports.login = async (req, res) => {
  const { email, password } = req.body;

  console.log("========== LOGIN DEBUG ==========");
  console.log("INPUT EMAIL:", email);
  console.log("INPUT PASSWORD:", password);

  try {
    // 🔍 Check user in DB
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    console.log("DB RESULT:", result.rows);

    // ❌ No user
    if (result.rows.length === 0) {
      console.log("❌ USER NOT FOUND");
      return res.status(404).json({ error: "User not found" });
    }

    const user = result.rows[0];

    console.log("DB PASSWORD:", user.password);

    // 🔥 Compare passwords (plain text)
    if (user.password != password) {
      console.log("❌ PASSWORD MISMATCH");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    console.log("✅ PASSWORD MATCH");

    // ✅ SUCCESS
    res.json({
      message: "LOGIN SUCCESS",
      user: {
        id: user.user_id,
        email: user.email,
        role: user.role,
      },
    });

  } catch (err) {
    console.error("❌ ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};