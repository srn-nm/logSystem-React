import { useContext, useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router/Router";
import Loading from './pages/Loading';
import DataContext from "./components/dataContext";
import "./style.css";

function App() {
  document.documentElement.setAttribute("data-theme", "dark");

  useEffect(() => {
    localStorage.setItem("isLoggedIn", "false");
  }, []);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => setLoading(false);

    if (document.readyState === "complete") {
      setLoading(false);
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  const [searchInput, setSearchInput] = useState<string>("");

  return (
    <DataContext.Provider value={{ searchInput, setSearchInput }}>
      {loading ? <Loading /> : <RouterProvider router={router} />}
    </DataContext.Provider>
  );
  
}

export default App;