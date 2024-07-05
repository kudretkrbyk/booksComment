import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Admin from "./pages/Admin";
import Main from "./pages/Main";
import Login from "./pages/Login";

function App() {
  const [loggedIn, setLoggedIn] = useState(null); // Başlangıç değeri null, böylece kontrol edebiliriz.
  const [logInUser, setLogInUser] = useState(null); // Başlangıç değeri null, boş array yerine.

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setLogInUser(JSON.parse(user));
      setLoggedIn(true);
    } else {
      setLogInUser(null);
      setLoggedIn(false);
    }
  }, []);

  const handleLogin = (user) => {
    setLoggedIn(true);
    setLogInUser(user);
    localStorage.setItem("user", JSON.stringify(user)); // Giriş yapıldığında kullanıcı bilgisini localStorage'a kaydedin.
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setLogInUser(null);
    localStorage.removeItem("user");
  };

  // Kullanıcı bilgisi kontrol ediliyorsa yükleme ekranı gösterebilirsiniz.
  if (loggedIn === null) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/admin"
          element={
            logInUser?.admincontrol ? <Admin /> : <div>Yetki hatası</div>
          }
        />
        <Route
          path="/*"
          element={
            loggedIn ? (
              <Main logOut={handleLogout} logInUser={logInUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={<Login setLogInUser={setLogInUser} onLogin={handleLogin} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
