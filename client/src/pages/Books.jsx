import { useState, useEffect } from "react";
import axios from "axios";

export default function Books() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    // Kitapları getir
    axios
      .get("http://localhost:3001/api/books")
      .then((response) => {
        setBooks(response.data); // Sunucudan gelen kitap verilerini state'e kaydet
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []);
  console.log("bu sayfa books sayfası", books);
  return (
    <div className="flex flex-col  gap-5">
      {books.map((book) => (
        <div key={book.id} className="flex items-center justify-start gap-10">
          <div>
            <img className="w-32 h-48" src={book.bookphoto}></img>
          </div>
          <div className="flex flex-col">
            {" "}
            <div className="font-bold text-xl"> {book.bookname} </div>
            <div> {book.writername} </div>
          </div>
          <div>
            <div>Okuma listesine kaydet</div>
            <div>Yorumları gör</div>
          </div>
        </div>
      ))}
    </div>
  );
}
