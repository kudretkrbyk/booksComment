import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Admin from "./pages/Admin";
import Main from "./pages/Main";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/*" element={<Main />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
