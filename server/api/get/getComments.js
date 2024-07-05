const pool = require("../../db/db");

const getComments = async () => {
  const query = `
    SELECT 
      books.id AS bookId,
      books.bookname,
      books.bookphoto,
      books.writername,
      json_agg(json_build_object('id', comments.id, 'comment', comments.comment, 'username', users.name)) AS comments
    FROM comments
    INNER JOIN users ON comments.commentuserid = users.id
    INNER JOIN books ON comments.bookid = books.id
    GROUP BY books.id, books.bookname, books.bookphoto,books.writername
  `;

  try {
    const res = await pool.query(query);
    return res.rows.map((row) => ({
      bookId: row.bookId,
      bookname: row.bookname,
      writername: row.writername,
      bookphoto: row.bookphoto,
      comments: row.comments,
    }));
  } catch (err) {
    console.error("Error fetching comments", err.stack);
    throw err;
  }
};

module.exports = {
  getComments,
};
