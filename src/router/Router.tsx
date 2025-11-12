import { createBrowserRouter } from "react-router-dom";
import Logs from "../pages/Logs";
import Layout from "../components/Layout";
import LoginPage from "../pages/Login";
import PrivateRoute from "../components/PrivateRoute";
import ErrorElement from "../components/ErrorElement";
import Dashboard from "../pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    element: <PrivateRoute />, 
    errorElement: <ErrorElement />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          {
            index: true,
            path: "Dashboard",
            element: <Dashboard />,
          },
          {
            path: "Logs",
            element: <Logs />,
          },
        ],
      },
    ],
  },
]);

export default router;
