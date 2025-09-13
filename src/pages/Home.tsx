import "../style.css";
import { Box, Card } from "@mui/material";
import List from "../components/List";
import DataCard from "../components/DataCard";
import DataTable from "../components/DataTable";

export default function Home() {

 
  return (
      <div className="flex flex-wrap gap-5 justify-stretch m-5">
        <DataTable></DataTable>
      </div>
  );
}
