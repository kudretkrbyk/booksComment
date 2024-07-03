const express = require("express");
const bodyParser = require("body-parser");
const { getUsers } = require("./api/get/getUsers");
const { getBooks } = require("./api/get/getBooks");

const app = express();
const port = 3001;

// Middleware
app.use(bodyParser.json()); // JSON veri işleme için

// Örnek GET endpoint: Tüm kullanıcıları getir
app.get("/api/users", async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch (err) {
    console.error("Error retrieving users", err);
    res.status(500).json({ error: "Error retrieving users" });
  }
});

// Örnek GET endpoint: Tüm kitapları getir
app.get("/api/books", async (req, res) => {
  try {
    const books = await getBooks();
    res.json(books);
  } catch (err) {
    console.error("Error retrieving books", err);
    res.status(500).json({ error: "Error retrieving books" });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
