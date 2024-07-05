import { Link } from "react-router-dom";

export default function LeftNavbar({ logOut }) {
  return (
    <div className="flex flex-col gap-2 p-2  w-2/12 fixed top-12">
      <div>Profil</div>
      <Link to={"/favcomments"}>
        <div>Beğendiğim Yorumlar</div>
      </Link>

      <Link to={"/favbooks"}>
        {" "}
        <div>Okuma Listem</div>
      </Link>
      <Link to={"/mycomments"}>
        {" "}
        <div>Yaptığım Yorumlar </div>
      </Link>

      <div>
        <button onClick={logOut}>Çıkış Yap</button>
      </div>
    </div>
  );
}
