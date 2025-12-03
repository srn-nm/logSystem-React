import { useContext, useEffect, useState } from "react";
import DataContext from "../contexts/dataContext";
import DesktopLogTable from "./DesktopLogTable.tsx";
import MobileLogTable from "./MobileLogTable.tsx";
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

  const mockData: ColumnsList[] = [
    {
      id: 1,
      api_key: "key_12345",
      ip_address: "192.168.1.100",
      path: "/api/v1/users",
      method: "GET",
      status_code: 200,
      process_time: 150,
      created_at: new Date("2024-01-15T10:30:00Z")
    },
    {
      id: 2,
      api_key: "key_67890",
      ip_address: "192.168.1.101",
      path: "/api/v1/auth/login",
      method: "POST",
      status_code: 201,
      process_time: 250,
      created_at: new Date("2024-01-15T10:32:00Z")
    },
    {
      id: 3,
      api_key: null,
      ip_address: "192.168.1.102",
      path: "/api/v1/products/123",
      method: "GET",
      status_code: 404,
      process_time: 80,
      created_at: new Date("2024-01-15T10:35:00Z")
    },
    {
      id: 4,
      api_key: "key_abcde",
      ip_address: "192.168.1.103",
      path: "/api/v1/orders",
      method: "POST",
      status_code: 400,
      process_time: 120,
      created_at: new Date("2024-01-15T10:40:00Z")
    },
    {
      id: 5,
      api_key: "key_fghij",
      ip_address: "192.168.1.104",
      path: "/api/v1/health",
      method: "GET",
      status_code: 200,
      process_time: 15,
      created_at: new Date("2024-01-15T10:45:00Z")
    }
  ];

  const fetchTableData = async () => {
    setLoading(true);
    await new Promise((res) => setTimeout(res, 500));

    // try {
    //   const res = await axios.get("http://localhost:3000/api/data", {
    //     params: { page: page + 1, limit: pageSize, search: searchInput },
    //   });
    //   const data = Array.isArray(res.data) ? res.data : [];
    //   setRows(data);
    //   setRowCount(data.length);
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    //   setRows([]);
    //   setRowCount(0);
    // } finally {
    //   setLoading(false);
    // }

    setRows(mockData);
    setRowCount(mockData.length);
    setLoading(false);
  };

  useEffect(() => {
    fetchTableData();
  }, [page, pageSize, searchInput]);

  return (
    <>
      <div className="flex items-center justify-center p-4 pb-0 m-0">

          <div className="">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-200 ml-1">
              Log Table
            </h1>
          </div>

          <div className="pl-4">
            <RefreshButton 
              onRefresh={fetchTableData} 
              loading={loading}
              tooltipTitle="Refresh Table Data"
            />
          </div>

      </div>

      <div className="w-full bg-gray-100 dark:bg-gray-900 transition-colors p-4">
        
        {/*Desktop*/}
        <div className="hidden lg:block">
          <DesktopLogTable
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
          <MobileLogTable
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