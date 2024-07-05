const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { getUsers } = require("./api/get/getUsers");
const { getBooks } = require("./api/get/getBooks");
const { addBook } = require("./api/post/addBook");
const { addComment } = require("./api/post/addComment");
const loginUser = require("./api/login/login");
const { getComments } = require("./api/get/getComments");

const app = express();
app.use(cors());
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

// GET endpoint: Tüm kitapları getir
app.get("/api/books", async (req, res) => {
  try {
    const books = await getBooks();
    res.json(books);
  } catch (err) {
    console.error("Error retrieving books", err);
    res.status(500).json({ error: "Error retrieving books" });
  }
});

// POST endpoint: Yeni bir kitap ekle
app.post("/api/books", async (req, res) => {
  const { bookname, writername, bookphoto } = req.body;

  try {
    const newBook = await addBook(bookname, writername, bookphoto);
    res.status(201).json(newBook);
  } catch (err) {
    console.error("Error adding book", err);
    res.status(500).json({ error: "Error adding book" });
  }
});

// Yorum ekleme
app.post("/api/comments", async (req, res) => {
  const { comment, commentuserid, bookid } = req.body;
  try {
    const newComment = await addComment(comment, commentuserid, bookid);
    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error adding comment", error);
    res.status(500).send("Error adding comment");
  }
});
// Yorumları getirme endpoint'i
app.get("/api/comments", async (req, res) => {
  try {
    const comments = await getComments();
    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// POST endpoint: Kullanıcı girişi
app.use("/api/login", loginUser);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
