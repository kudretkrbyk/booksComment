const express = require("express");
const router = express.Router();
const pool = require("../../db/db");

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  const query = `
    SELECT id, password FROM users WHERE email = $1
  `;

  try {
    const result = await pool.query(query, [email]);

    if (result.rows.length === 0 || result.rows[0].password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const userId = result.rows[0].id;
    res.json({ userId });
  } catch (error) {
    console.error("Login error:", error.stack);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
