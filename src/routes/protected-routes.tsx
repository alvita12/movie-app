import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = () => {
  const { pathname } = useLocation();

  const token = localStorage.getItem("token");

  const tokenProtected = ["/", "/movies", "/tv-shows", "/trending"];
  const publicProtected = ["/login"];

  if (tokenProtected.includes(pathname)) {
    if (!token) {
      return <Navigate to={"/login"} />;
    }
  }

  if (publicProtected.includes(pathname)) {
    if (token) {
      return <Navigate to={"/"} />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoutes;
