const pool = require("../../db/db");

const getBooks = async () => {
  const query = `
    SELECT * FROM books;
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
  getBooks,
};
