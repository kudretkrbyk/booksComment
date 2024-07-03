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
        <div
          key={book.id}
          className="flex items-center justify-start gap-10 shadow-xl p-10"
        >
          <div>
            <img
              className="w-32 h-48 hover:scale-110 duration-700"
              src={book.bookphoto}
            ></img>
          </div>
          <div className="flex flex-col items-start justify-center gap-5">
            {" "}
            <div className="font-bold text-xl"> {book.bookname} </div>
            <div> {book.writername} </div>{" "}
            <div className="flex  items-center justify-center gap-4 text-white">
              <div>
                <button className="bg-gray-400 p-2 px-4 rounded-2xl">
                  Okuma listesine kaydet
                </button>
              </div>
              <div>
                <button className="bg-gray-400 p-2 px-4 rounded-2xl">
                  Yorumları gör
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
