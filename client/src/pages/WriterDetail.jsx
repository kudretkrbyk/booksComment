import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function WriterDetail() {
  const { writername } = useParams(); // Parametreyi yazarın adı olarak değiştirdim
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Kitapları getir
    axios
      .get("http://localhost:3001/api/books") // Kitap verilerini almak için api/books endpoint'ine istek at
      .then((response) => {
        // Gelen veriyi yazar adına göre filtrele
        const writerBooks = response.data.filter(
          (book) => book.writername === writername
        );
        setBooks(writerBooks);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, [writername]);

  if (books.length === 0) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-5 w-full">
      {books.map((book) => (
        <div
          key={book.id}
          className="flex flex-col w-full p-4 items-start gap-10"
        >
          <div className="flex gap-4 items-end justify-start">
            <div>
              <img
                src={book.bookphoto}
                alt={book.bookname}
                className="w-32 h-48 hover:scale-110 duration-700"
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="font-bold text-xl text-transform: uppercase">
                {book.bookname}
              </div>
              <div className="text-transform: uppercase">{book.writername}</div>
              <div className="flex gap-10 items-end justify-center">
                <div>
                  <button className="bg-gray-400 p-2 px-4 rounded-2xl">
                    Okuma listesine kaydet
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full"></div>
        </div>
      ))}
    </div>
  );
}
