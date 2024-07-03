import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex items-center justify-center gap-5 w-full p-4">
      <Link to="/books">Kitaplar</Link>
      <Link to="/comments">Kitaplardan Cümleler</Link>
      <Link to="/readers">Okurlar</Link>
    </div>
  );
}
