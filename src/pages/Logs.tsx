import "../style.css";
import LogTable from "../components/LogTable";

export default function Logs() {

  return (
    <div className="flex flex-wrap justify-stretch m-2">
      <LogTable/>
    </div>
  );
}