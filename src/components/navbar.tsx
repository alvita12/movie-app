import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex flex-row w-full justify-between px-5 py-3 font-bold bg-slate-400 shadow-lg">
      <h2 className="text-base">Haiiiii :p</h2>
      <div className="flex flex-row gap-5">
        <Link to={"/"}>Home</Link>
        <Link to={"/movies"}>Movies</Link>
        <Link to={"/tv-shows"}>TV Shows</Link>
        <Link to={"/trending"}>Trending</Link>
        <div onClick={handleLogout}>Logout</div>
      </div>
    </div>
  );
}

export default Navbar;
