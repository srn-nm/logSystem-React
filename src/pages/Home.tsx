import { useContext } from "react";
import DataContext from "../components/dataContext";
import "../style.css";
import { Box, Card } from "@mui/material";
import List from "../components/List";
import DataCard from "../components/DataCard";

export default function Home() {

  const context = useContext(DataContext);

  if (!context) {
    throw new Error("SearchBar must be used within a DataContext.Provider");
  }

  const {searchInput, setSearchInput } = context;
  
  return (
      <div className="flex flex-wrap gap-5 justify-stretch m-5">
        <List searchInput={searchInput} />
      </div>

  );
}
