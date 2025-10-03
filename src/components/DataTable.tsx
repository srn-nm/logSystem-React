import { useContext, useEffect, useState } from "react";
import axios from "axios";
import DataContext from "../contexts/dataContext";

interface Column {
  id: string;
  label: string;
  align?: "right" | "left";
  type?: "string" | "number" | "date";
  format?: string;
}

export default function DataTable() {
  const context = useContext(DataContext);
  if (!context) return <div>Context not available</div>;
  const { searchInput } = context;

  const [columns, setColumns] = useState<Column[]>([]);
  const [rows, setRows] = useState<any[]>([]);
  const [totalRows, setTotalRows] = useState(0);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const getNestedValue = (obj: any, path: string) => {
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
  };

  useEffect(() => {
    const fetchSchema = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/schema");
        const schema = Array.isArray(res.data)
          ? res.data
          : res.data.columns || [];
        setColumns(schema);
      } catch (err) {
        console.error("Error fetching schema:", err);
        setColumns([]);
      }
    };
    fetchSchema();
  }, []); // only once

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:3001/api/data", {
          params: {
            page: page + 1,
            limit: rowsPerPage,
            search: searchInput,
          },
        });
        console.log(res.data)
        setRows(res.data || []);
        setTotalRows(res.data.length);
      } catch (err) {
        console.error("Error fetching data:", err);
        setRows([]);
        setTotalRows(0);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page, rowsPerPage, searchInput]);

  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const formatValue = (value: any, column: Column) => {
    if (value == null) return "";
    if (column.type === "number" && typeof value === "number") {
      if (column.format === "number") return value.toLocaleString("en-US");
      if (column.format === "float2") return value.toFixed(2);
    }
    if (column.type === "date") {
      const date = new Date(value);
      return isNaN(date.getTime()) ? value : date.toLocaleString();
    }
    return value;
  };

  return (
    <div className="w-full bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="overflow-x-auto rounded-l shadow-lg bg-white dark:bg-gray-800 transition-colors">
        {loading ? (
          <div className="p-4 text-center">Loading...</div>
        ) : (
          <table className=" min-w-full table-auto ">
            <thead className="sticky top-0 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 transition-colors">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.id}
                    className={`px-4 py-3 text-sm font-semibold ${
                      column.align === "right" ? "text-right" : "text-left"
                    }`}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-4 py-4 text-center text-gray-500"
                  >
                    No data found
                  </td>
                </tr>
              ) : (
                rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="border-b border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-400 dark:text-gray-300"
                  >
                    {columns.map((column) => (
                      <td
                        key={column.id}
                        className={`px-4 py-2 text-sm ${
                          column.align === "right" ? "text-right" : "text-left"
                        }`}
                      >
                        {formatValue(getNestedValue(row, column.id), column)}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      <div className="flex items-center justify-between mt-4 text-gray-900 dark:text-gray-200">
        <div className="text-sm">
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setPage(0);
            }}
            className="ml-2 mr-2 rounded bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200"
          >
            {[10, 25, 100].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          : تعداد ردیف ها
        </div>
        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
            className="px-3 py-1 disabled:opacity-50"
          >
            &lt;
          </button>
          <span>
            صفحه {page + 1} از {totalPages || 1}
          </span>
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
            disabled={page >= totalPages - 1}
            className="px-3 py-1 disabled:opacity-50"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
