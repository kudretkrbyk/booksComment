const pool = require("../../db/db");

const addBook = async (bookname, writername, bookphoto) => {
  const query = `
    INSERT INTO books (bookname, writername, bookphoto)
    VALUES ($1, $2, $3)
    RETURNING id, bookname, writername, bookphoto
  `;

  try {
    const res = await pool.query(query, [bookname, writername, bookphoto]);
    return res.rows[0];
  } catch (err) {
    console.error("Error executing insert query", err.stack);
    throw err;
  }
};

module.exports = {
  addBook,
};
