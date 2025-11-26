import { useContext, useEffect, useState } from "react";
import axios from "axios";
import DataContext from "../contexts/dataContext";
import DesktopDataGrid from "./DesktopDataGrid";
import MobileDataGrid from "./MobileDataGrid";
import { RefreshButton } from "./RefreshButton";

export interface ColumnsList {
  id: number | null;
  api_key: string | null;
  ip_address: string;
  path: string;
  method: string;
  status_code: number;
  request_body?: Record<string, any> | any[] | null;
  response_body?: Record<string, any> | any[] | null;
  query_params?: Record<string, any> | null;
  path_params?: Record<string, any> | null;
  process_time: number;
  created_at: Date;
}

export default function logTable() {
  const context = useContext(DataContext);
  if (!context) return <div>Context not available</div>;
  const { searchInput } = context;

  const [rows, setRows] = useState<ColumnsList[]>([]);
  const [loading, setLoading] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const fetchTableData = async () => {
    setLoading(true);
    // await new Promise((res) => setTimeout(res, 500));
    try {
      const res = await axios.get("http://localhost:3000/api/data", {
        params: { page: page + 1, limit: pageSize, search: searchInput },
      });
      const data = Array.isArray(res.data) ? res.data : [];
      setRows(data);
      setRowCount(data.length);
    } catch (error) {
      console.error("Error fetching data:", error);
      setRows([]);
      setRowCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, [page, pageSize, searchInput]);

  return (
    <>
      <div className="pl-4">
        <RefreshButton 
          onRefresh={fetchTableData} 
          loading={loading}
          tooltipTitle="Refresh Table Data"
        />
      </div>

      <div className="w-full bg-gray-100 dark:bg-gray-900 transition-colors p-4">
        
        {/*Desktop*/}
        <div className="hidden lg:block">
          <DesktopDataGrid
            rows={rows}
            loading={loading}
            rowCount={rowCount}
            page={page}
            pageSize={pageSize}
            setPage={setPage}
            setPageSize={setPageSize}
          />
        </div>

        {/*Mobile*/}
        <div className="lg:hidden">
          <MobileDataGrid
            rows={rows}
            loading={loading}
            rowCount={rowCount}
            page={page}
            pageSize={pageSize}
            setPage={setPage}
            setPageSize={setPageSize}
          />
        </div>
      </div>
    </>
  );
}
