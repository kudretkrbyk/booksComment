export default function LeftNavbar({ logOut }) {
  return (
    <div className="flex flex-col gap-2 p-2  w-2/12 fixed top-12">
      <div>Profil</div>
      <div>Okuma Listem</div>
      <div>Beğendiğim Yorumlar</div>
      <div>
        <button onClick={logOut}>Çıkış Yap</button>
      </div>
    </div>
  );
}
