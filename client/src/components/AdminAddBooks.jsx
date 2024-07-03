import { useState } from "react";
import axios from "axios";

function AdminAddBooks() {
  const [bookname, setBookname] = useState("");
  const [writername, setWritername] = useState("");
  const [bookphoto, setBookphoto] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3001/api/books", {
        bookname,
        writername,
        bookphoto,
      });
      console.log("Book added:", response.data);
      setBookname("");
      setWritername("");
      setBookphoto("");
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <form className=" flex gap-4 p-4 " onSubmit={handleSubmit}>
      <input
        className="p-2"
        type="text"
        placeholder="Book Name"
        value={bookname}
        onChange={(e) => setBookname(e.target.value)}
      />
      <input
        type="text"
        placeholder="Writer Name"
        value={writername}
        onChange={(e) => setWritername(e.target.value)}
      />
      <input
        type="text"
        placeholder="Book Photo URL"
        value={bookphoto}
        onChange={(e) => setBookphoto(e.target.value)}
      />
      <button className="bg-blue-200 p-2 rounded-2xl px-4" type="submit">
        Add Book
      </button>
    </form>
  );
}

export default AdminAddBooks;
