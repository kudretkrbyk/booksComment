const pool = require("../../db/db");

const addFavComment = async (commentid, favcommentuserid) => {
  const query = `
    INSERT INTO favcomments (commentid, favcommentuserid)
    VALUES ($1, $2)
    RETURNING *;
  `;

  try {
    const res = await pool.query(query, [commentid, favcommentuserid]);
    return res.rows[0];
  } catch (err) {
    console.error("Error inserting favcomment", err.stack);
    throw err;
  }
};

module.exports = {
  addFavComment,
};
