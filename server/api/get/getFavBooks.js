const pool = require("../../db/db");

const getFavBooks = async (favuserid) => {
  const query = `
    SELECT b.*
    FROM favbooks fb
    JOIN books b ON fb.bookid = b.id
    WHERE fb.favuserid = $1;
  `;

  try {
    const res = await pool.query(query, [favuserid]);
    return res.rows;
  } catch (err) {
    console.error("Error fetching favorite books", err.stack);
    throw err;
  }
};

module.exports = {
  getFavBooks,
};
