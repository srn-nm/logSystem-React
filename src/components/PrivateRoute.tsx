import { Navigate, Outlet } from "react-router-dom";
import "../style.css";

export default function PrivateRoute() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}
