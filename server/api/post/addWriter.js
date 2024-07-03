const pool = require("../../db/db");

const addWriter = async (writerName, bookId) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const insertWriterText =
      "INSERT INTO writers (name) VALUES ($1) RETURNING id";
    const resWriter = await client.query(insertWriterText, [writerName]);

    const writerId = resWriter.rows[0].id;

    // bookWriter tablosuna ekleme
    const insertBookWriterText =
      "INSERT INTO bookWriter (book_id, writer_id) VALUES ($1, $2)";
    await client.query(insertBookWriterText, [bookId, writerId]);

    await client.query("COMMIT");
    console.log("Yazar başarıyla eklendi!");
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error adding writer", err);
  } finally {
    client.release();
  }
};

module.exports = {
  addWriter,
};
