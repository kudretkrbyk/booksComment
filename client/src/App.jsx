// App.jsx
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import Admin from "./pages/Admin";
import Main from "./pages/Main";
import Login from "./pages/Login";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleLogin = (userId) => {
    setLoggedIn(true);
    setUserId(userId);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserId(null);
  };

  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/*"
          element={
            loggedIn ? (
              <Main logOut={handleLogout} userId={userId} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
      </Routes>
    </Router>
  );
}

export default App;
