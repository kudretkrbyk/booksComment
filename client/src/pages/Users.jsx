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
    <div>
      {users.map((user) => (
        <div key={user.id} className="hero bg-base-200 ">
          <div className="hero-content flex-col lg:flex-row">
            <img
              src="https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.jpg"
              className="w-32 rounded-full shadow-2xl"
            />
            <div>
              <h1 className="text-5xl font-bold">{user.Name} </h1>
              <p className="py-6">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
