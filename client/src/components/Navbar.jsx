import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="z-50 fixed top-0 flex items-center justify-center gap-5 w-full p-4 bg-gray-400 font-bold text-white">
      <Link to="/books">Kitaplar</Link>
      <Link to="/comments">Kitaplardan Cümleler</Link>
      <Link to="/readers">Okurlar</Link>
    </div>
  );
}
