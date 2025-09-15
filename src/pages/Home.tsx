import "../style.css";
import DataTable from "../components/DataTable";

export default function Home() {

  return (
    <div className="flex flex-wrap gap-5 justify-stretch m-5">
      <DataTable/>
    </div>
  );
}