import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function FavComments({ logInUser }) {
  const [favComments, setFavComments] = useState([]);

  useEffect(() => {
    const fetchFavComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/api/favcomments/${logInUser.id}`
        );
        setFavComments(response.data);
      } catch (error) {
        console.error("Error fetching favorite comments:", error);
      }
    };

    fetchFavComments();
  }, [logInUser.id]);
  console.log("favcomment sayfası", favComments);
  return (
    <div className="flex flex-col gap-5 w-full p-5">
      {favComments.map((favComment) => (
        <div
          key={favComment.commentid}
          className="flex flex-col w-full p-4 items-start gap-10 shadow-2xl"
        >
          <div className="flex gap-4 items-end justify-start">
            <div>
              <img
                src={favComment.bookphoto}
                alt={favComment.bookname}
                className="w-32 h-48 hover:scale-110 duration-700"
              />
            </div>
            <div className="flex flex-col gap-1">
              <div className="font-bold text-xl">{favComment.bookname}</div>
              <div>{favComment.username}</div>
            </div>
          </div>
          <div className="p-4 bg-gray-100 w-full">
            <p>{favComment.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
