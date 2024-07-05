import { Route, Routes } from "react-router-dom";
import LeftNavbar from "../components/LeftNavbar";
import Books from "./Books";
import Comments from "./Comments";
import Users from "./Users";
import Navbar from "../components/Navbar";
import BookDetail from "./BookDetail";

export default function Main({ logOut, logInUser }) {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-around gap-2 p-1 w-full">
        <div className="w-2/12">
          <LeftNavbar logOut={logOut} />
        </div>
        <div className="w-8/12">
          <Routes>
            <Route path="/*" element={<Books />} />
            <Route path="/books" element={<Books logInUser={logInUser} />} />
            <Route path="/comments" element={<Comments />} />
            <Route path="/readers" element={<Users />} />
            <Route path="/books/:id" element={<BookDetail />} />
          </Routes>
        </div>
        <div>sdsdsd</div>
      </div>
    </div>
  );
}
