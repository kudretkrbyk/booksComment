const pool = require("../../db/db");

const getFavComments = async (favcommentuserid) => {
  const query = `
    SELECT fc.id as favcommentid, c.comment, c.commentuserid, c.bookid, b.bookname, b.bookphoto, u.name
    FROM favcomments fc
    JOIN comments c ON fc.commentid = c.id
    JOIN books b ON c.bookid = b.id
    JOIN users u ON c.commentuserid = u.id
    WHERE fc.favcommentuserid = $1;
  `;

  try {
    const res = await pool.query(query, [favcommentuserid]);
    return res.rows;
  } catch (err) {
    console.error("Error fetching favorite comments", err.stack);
    throw err;
  }
};

module.exports = {
  getFavComments,
};
