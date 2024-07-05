import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function FavBooks({ logInUser }) {
  const [favBooks, setFavBooks] = useState([]);
  const [comment, setComment] = useState("");
  const [selectedBookId, setSelectedBookId] = useState(null);
  console.log("burası favBooks ", logInUser);

  useEffect(() => {
    // Kullanıcının favori kitaplarını getir
    axios
      .get(`http://localhost:3001/api/favbooks/${logInUser.id}`)
      .then((response) => {
        setFavBooks(response.data); // Sunucudan gelen favori kitap verilerini state'e kaydet
      })
      .catch((error) => {
        console.error("Error fetching favorite books:", error);
      });
  }, [logInUser.id]);

  const handleCommentSubmit = async (event, bookId) => {
    event.preventDefault();
    try {
      const userId = logInUser.id;
      await axios.post("http://localhost:3001/api/comments", {
        comment,
        commentuserid: userId,
        bookid: bookId,
      });
      setComment(""); // Yorum yapıldıktan sonra formu temizle
      setSelectedBookId(null); // Formu kapat
      console.log("Yorum eklendi");
    } catch (error) {
      console.error("Yorum eklenirken hata:", error);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {favBooks.map((book) => (
        <div
          key={book.id}
          className="flex items-center justify-start gap-10 shadow-xl p-10"
        >
          <div>
            <img
              className="w-32 h-48 hover:scale-110 duration-700"
              src={book.bookphoto}
              alt={book.bookname}
            />
          </div>
          <div className="flex flex-col items-start justify-center gap-5">
            <div className="font-bold text-xl">{book.bookname}</div>
            <Link to={`/writer/${book.writername}`}>
              {" "}
              <div>{book.writername}</div>{" "}
            </Link>{" "}
            <div className="flex items-center justify-center gap-4 text-white">
              <div>
                <Link to={`/books/${book.id}`}>
                  {" "}
                  <button className="bg-gray-400 p-2 px-4 rounded-2xl">
                    Yorumları gör
                  </button>
                </Link>
              </div>
              <div>
                <button
                  className="bg-gray-400 p-2 px-4 rounded-2xl"
                  onClick={() => setSelectedBookId(book.id)}
                >
                  Yorum Yap
                </button>
              </div>
            </div>
            {selectedBookId === book.id && (
              <form
                onSubmit={(e) => handleCommentSubmit(e, book.id)}
                className="mt-4"
              >
                <textarea
                  className="border p-2 w-full"
                  placeholder="Yorumunuzu yazın"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <button
                  type="submit"
                  className="bg-blue-500 text-white p-2 mt-2 rounded"
                >
                  Yorum Yap
                </button>
              </form>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
