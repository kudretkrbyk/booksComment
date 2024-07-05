import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    // Kitapları ve yorumları getir
    axios
      .get("http://localhost:3001/api/comments")
      .then((response) => {
        // Gelen veriyi ilgili kitap id'sine göre filtrele
        const bookDetail = response.data.find((b) => b.bookId === parseInt(id));
        setBook(bookDetail);
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
      });
  }, [id]);

  if (!book) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-5 w-full">
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
            <div className="font-bold text-xl">{book.bookname}</div>
            <div>{book.writername}</div>
            <div className="flex gap-10 items-end justify-center">
              <div>
                <button className="bg-gray-400 p-2 px-4 rounded-2xl">
                  Okuma listesine kaydet
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex flex-col gap-4 w-full">
          {book.comments.map((cmt) => (
            <div key={cmt.id} className="card card-compact  w-1/2 ">
              <div className=" flex items-center justify-between gap-4">
                <div className="p-4 bg-gray-100">
                  <p>{cmt.comment}</p>
                </div>
              </div>{" "}
              <div>
                <button className="bg-gray-400 p-2 px-4 rounded-xl">
                  Favoriye Ekle
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
