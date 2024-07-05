const pool = require("../../db/db");

const addFavBooks = async (bookid, favuserid) => {
  const query = `
    INSERT INTO favbooks (bookid, favuserid)
    VALUES ($1, $2)
    RETURNING *;
  `;

  try {
    const res = await pool.query(query, [bookid, favuserid]);
    return res.rows[0];
  } catch (err) {
    console.error("Error inserting favorite book", err.stack);
    throw err;
  }
};

module.exports = {
  addFavBooks,
};
