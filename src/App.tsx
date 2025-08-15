import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router/Router";
import Loading from './pages/Loading';
import "./style.css";

function App() {
  document.documentElement.setAttribute("data-theme", "dark");

  useEffect(() => {
    localStorage.setItem("isLoggedIn", "false");
  }, []);


  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This fires when the window finishes loading
    const handleLoad = () => setLoading(false);
    
    if (document.readyState === "complete") {
      // Page already loaded
      setLoading(false);
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
    localStorage.setItem("isLoggedIn", "false");
  }, []);

  return loading ? <Loading /> : <RouterProvider router={router} />;
}

export default App;



