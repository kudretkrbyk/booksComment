import { Route, Routes } from "react-router-dom";
import LeftNavbar from "../components/LeftNavbar";
import Books from "./Books";
import Comments from "./Comments";
import Users from "./Users";
import Navbar from "../components/Navbar";

export default function Main() {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-around gap-2 p-1 w-full">
        <div className="w-2/12">
          <LeftNavbar />
        </div>
        <div className="w-8/12">
          <Routes>
            <Route path="books" element={<Books />} />
            <Route path="comments" element={<Comments />} />
            <Route path="readers" element={<Users />} />
          </Routes>
        </div>
        <div>sdsdsd</div>
      </div>
    </div>
  );
}
