const pool = require("../../db/db");

const getUsers = async () => {
  const query = `
    SELECT id,name,email FROM users;
  `;

  try {
    const res = await pool.query(query);
    return res.rows;
  } catch (err) {
    console.error("Error executing select query", err.stack);
    throw err;
  }
};

module.exports = {
  getUsers,
};
