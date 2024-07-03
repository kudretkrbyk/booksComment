const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "books",
  password: "kudret",
  port: 5432,
});

// JOIN sorgusu ile verileri alma
const query = `
  SELECT
    bw.id,
    
    b.Name AS book_name,
    
    w.Name AS writer_name
  FROM
    bookWriter bw
  JOIN
    books b ON bw.book_id = b.id
  JOIN
    writer w ON bw.writer_id = w.id;
`;

pool.query(query, (err, res) => {
  if (err) {
    console.error("Error executing query", err.stack);
  } else {
    console.log("BookWriter Data with Books and Writers:", res.rows);
  }
  pool.end();
});
