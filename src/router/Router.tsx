import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../components/Layout";
import LoginPage from "../pages/Login";
import PrivateRoute from "../components/PrivateRoute";
import ErrorElement from "../components/ErrorElement";

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
            element: <Home />,
          },
          // {
          //   path: "Dashboard",
          //   element: <Dashboard />,
          // },
        ],
      },
    ],
  },
]);

export default router;
