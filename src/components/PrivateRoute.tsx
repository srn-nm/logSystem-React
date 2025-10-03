import { Navigate, Outlet } from "react-router-dom";
import "../style.css";
import Cookies from "js-cookie"

export default function PrivateRoute() {
  const session = Cookies.get("session");
  return session ? <Outlet /> : <Navigate to="/login" />;
}