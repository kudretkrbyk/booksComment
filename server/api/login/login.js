const express = require("express");
const router = express.Router();
const pool = require("../../db/db");
const jwt = require("jsonwebtoken");
const config = require("../../config/config.json"); // JWT secret key için

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  const query = `
    SELECT id, password, name FROM users WHERE email = $1
  `;

  try {
    const result = await pool.query(query, [email]);

    if (result.rows.length === 0 || result.rows[0].password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = result.rows[0];
    const token = jwt.sign(
      { id: user.id, email: user.email },
      config.jwt.secret,
      { expiresIn: "1h" }
    );

    res.json({ token, user: { id: user.id, name: user.name, email } });
  } catch (error) {
    console.error("Login error:", error.stack);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
