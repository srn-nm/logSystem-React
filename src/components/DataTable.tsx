import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import DataContext from "../contexts/dataContext";
import RefreshButton from "./RefteshButton";
import Box from "@mui/material/Box";

interface ColumnsList {
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

export default function DataTable() {
  const context = useContext(DataContext);
  if (!context) return <div>Context not available</div>;
  const { searchInput } = context;

  const [rows, setRows] = useState<ColumnsList[]>([]);
  const [loading, setLoading] = useState(false);
  const [rowCount, setRowCount] = useState(0);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [filter, setFilter] = useState<string>(""); // for mobile filtering

  const handleRefresh = async () => {
    fetchData(); 
  };

  const deskColumns: GridColDef[] = [
      { field: "id", headerName: "ID", flex: 1, minWidth: 50 },
      { field: "ip_address", headerName: "IP Address", flex: 1, minWidth: 50 },
      { field: "path", headerName: "Path", flex: 1, minWidth: 50 },
      { field: "method", headerName: "Method", flex: 1, minWidth: 50 },
      { field: "status_code", headerName: "Status", flex: 1, minWidth: 50 },
      // { field: "request_body",
      //   headerName: "Request Body",
      //   flex: 2,
      //   minWidth: 50,
      //   renderCell: (params: any) => (
      //     <span className="truncate">
      //       {JSON.stringify(params.value)?.slice(0, 80) || ""}
      //     </span>
      //   ),
      // },
      // { field: "response_body",
      //   headerName: "Response Body",
      //   flex: 2,
      //   minWidth: 50,
      //   renderCell: (params: any) => (
      //     <span className="truncate">
      //       {JSON.stringify(params.value)?.slice(0, 80) || ""}
      //     </span>
      //   ),
      // },
      { field: "process_time", headerName: "Process Time (ms)", flex: 1 ,minWidth: 50},
      { field: "created_at",
        headerName: "Created At",
        flex: 1.5,
        minWidth: 50,
        valueFormatter: (params: any) =>
          new Date(params.value).toLocaleString("fa-IR"),
      },
  ];

   const fetchData = async () => {
      setLoading(true);
      await new Promise((res) => setTimeout(res, 1000));
      try {
        const res = await axios.get("http://localhost:3001/api/data", {
          params: {
            page: page + 1,
            limit: pageSize,
            search: searchInput,
          },
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
    fetchData();
  }, [page, pageSize, searchInput]);

  // filter rows for mobile
  const filteredRows = rows.filter((row) =>
    Object.values(row).some((val) =>
      JSON.stringify(val).toLowerCase().includes(filter.toLowerCase())
    )
  );

  return (
    <>
    <RefreshButton onRefresh={handleRefresh} loading={loading} />
    <div className="w-full bg-gray-100 dark:bg-gray-900 transition-colors p-4" >
      {/* Desktop DataGrid */}
      <div className="hidden lg:block rounded-lg shadow-lg bg-white dark:bg-gray-800 transition-colors ">
        <Box sx={{ flex: 1, position: 'relative' }}>
        <Box sx={{ position: 'absolute', inset: 0 }}>
        <Box sx={{ height: "calc(100vh - 230px)", width: "100%" }}>
        <DataGrid
          autoHeight={false}
          rows={rows}
          columns={deskColumns}
          loading={loading}
          pagination
          paginationMode="server"
          paginationModel={{ page, pageSize }}
          onPaginationModelChange={(model) => {
            setPage(model.page);
            setPageSize(model.pageSize);
          }}
          rowCount={rowCount}
          pageSizeOptions={[10, 25, 100]}
          disableRowSelectionOnClick
          disableColumnResize
          filterMode="client"
          sortingMode="client"
          sx={{
            height: "100%",
            width: "100%",
            minWidth: 0,
            overflow: "hidden",
            color: "var(--mui-palette-text-primary)",
            backgroundColor: "var(--mui-palette-background-paper)",
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: "#374151", 
              color: "#e5e7eb", 
            },
            "& .MuiDataGrid-cell": {
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              color: "#e5e7eb",
              borderBottom: "1px solid #4b5563",
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#1f2937",
              color: "#e5e7eb",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: "#1f2937",
            },
            "& .MuiDataGrid-row:hover": {
            backgroundColor: "#4b5563",
            color: "#f9fafb",     
            },
            "& .MuiTablePagination-root": {
              color: "#e5e7eb", 
            },
            "& .MuiTablePagination-select": {
              color: "#e5e7eb",            
              backgroundColor: "#374151",   
            },
            "& .MuiSelect-icon": {
              color: "#e5e7eb",    
            },
          }}
        />
        </Box>
        </Box>
        </Box>
      </div>

      {/* Mobile Card Format */}
      <div className="lg:hidden mt-4 space-y-4">
        <div className="flex items-center justify-center mb-3">
          <input
            type="text"
            placeholder="فیلتر کنید..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full max-w-md px-3 py-2 rounded-lg border border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {loading ? (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            در حال بارگذاری...
          </div>
        ) : filteredRows.length === 0 ? (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            داده‌ای یافت نشد
          </div>
        ) : (
          filteredRows.map((row, idx) => (
            <div
              key={idx}
              className="border rounded-lg shadow-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition-colors"
            >
              <table className="w-full table-auto">
                {deskColumns.map((col) => (
                  <tr
                    key={col.field}
                    className="border-b border-gray-300 dark:border-gray-600"
                  >
                    <th className="px-4 py-2 text-left text-sm font-medium w-1/3 bg-gray-100 dark:bg-gray-700">
                      {col.headerName}
                    </th>
                    <td className="px-4 py-2 text-sm w-2/3">
                      {(() => {
                        const val = (row as any)[col.field];
                        if (val == null) return "";
                        if (typeof val === "object")
                          return JSON.stringify(val).slice(0, 80);
                        return String(val);
                      })()}
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          ))
        )}
      </div>
    </div>
    </>
  );
}