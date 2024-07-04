const pool = require("../../db/db");

const addComment = async (comment, commentuserid, bookid) => {
  const query = `
    INSERT INTO comments (comment, commentuserid, bookid)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;

  try {
    const res = await pool.query(query, [comment, commentuserid, bookid]);
    return res.rows[0];
  } catch (err) {
    console.error("Error inserting comment", err.stack);
    throw err;
  }
};

module.exports = {
  addComment,
};
