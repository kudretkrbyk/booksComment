import { useEffect, useState } from "react";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    // Kitapları getir
    axios
      .get("http://localhost:3001/api/users")
      .then((response) => {
        setUsers(response.data); // Sunucudan gelen kitap verilerini state'e kaydet
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);
  console.log("users sayfası", users);

  return (
    <div className="w-full flex flex-col items-start justify-start p-5">
      {users.map((user) => (
        <div key={user.id} className="hero  w-full shadow-2xl">
          <div className="hero-content flex-col lg:flex-row gap-10 items-center justify-start w-full">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNZ_Ce93mHKz3Mz9wCQXL_lBkyGVouYRoWqQ&s"
              className="w-32 rounded-full shadow-2xl"
            />
            <div className=" flex flex-col gap-5">
              <h1 className="text-5xl font-bold">{user.name} </h1>
              <div className="p-2">
                <button className="bg-gray-400 rounded-2xl p-2 px-4 text-white">
                  Yorumlarını gör
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
