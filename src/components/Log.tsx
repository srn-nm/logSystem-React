import { useCallback, useContext, useEffect, useState } from "react";
import DataContext from "../contexts/dataContext.tsx";
import LogHeader from "./LogHeader.tsx";
import LogBody from "./LogBody.tsx";
import type { ColumnsList } from "./ColumnsList.tsx";

export default function log() {
  const context = useContext(DataContext);
  if (!context) return <div>Context not available</div>;
  const { searchInput } = context;

  const [rows, setRows] = useState<ColumnsList[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [rowCount, setRowCount] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);

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

  const callFetchTableData = useCallback(() => fetchTableData, []);

  useEffect(() => {
    fetchTableData();
  }, [page, pageSize, searchInput]);

  return (

    <div className="w-full bg-gray-100 dark:bg-gray-900 transition-colors min-h-screen p-3 pt-5 lg:p-7"> 
        <LogHeader callFetchTableData={callFetchTableData} loading={loading}/>

        <LogBody
          rows={rows}
          loading={loading}
          rowCount={rowCount}
          page={page}
          pageSize={pageSize}
          setPage={setPage}
          setPageSize={setPageSize}
        />
    </div>

  );
}