import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Comments({ logInUser }) {
  // logInUser prop'u ekledik
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Yorumları getir
    axios
      .get("http://localhost:3001/api/comments")
      .then((response) => {
        setComments(response.data); // Sunucudan gelen yorum verilerini state'e kaydet
      })
      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, []);
  console.log("comment sayfası:", logInUser);
  const handleAddToFavComments = async (commentId) => {
    try {
      const favCommentUserId = logInUser.id; // Giriş yapan kullanıcının ID'si
      await axios.post("http://localhost:3001/api/favcomments", {
        commentid: commentId,
        favcommentuserid: favCommentUserId,
      });
      console.log("Yorum favorilere eklendi");
    } catch (error) {
      console.error("Favorilere eklenirken hata:", error);
    }
  };

  console.log("comments sayfası", comments);

  return (
    <div className="z-10 flex flex-col gap-5 w-full p-5">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="flex flex-col w-full p-4 items-start gap-10 shadow-2xl"
        >
          <div className="flex gap-4 items-end justify-start">
            <div>
              <img
                src={comment.bookphoto}
                alt={comment.bookname}
                className="w-32 h-48 hover:scale-110 duration-700"
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="font-bold text-xl">{comment.bookname}</div>
              <div>{comment.writername}</div>
              <div className="flex gap-10 items-end justify-center">
                <div>
                  <button className="bg-gray-400 p-2 px-4 rounded-2xl">
                    Okuma listesine kaydet
                  </button>
                </div>
                <div>
                  <Link to={`/books/${comment.bookId}`}>
                    {" "}
                    <button className="bg-gray-400 p-2 px-4 rounded-2xl">
                      Tüm Yorumları gör
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-full">
            {comment.comments.map((cmt) => (
              <div key={cmt.id} className="card card-compact w-1/2 ">
                <div className="flex items-center justify-between gap-4">
                  <div className="p-4 bg-gray-100">
                    <p>{cmt.comment}</p>
                  </div>
                </div>{" "}
                <div>
                  <button
                    className="bg-gray-400 p-2 px-4 rounded-xl"
                    onClick={() => handleAddToFavComments(cmt.id)}
                  >
                    Favoriye Ekle
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
