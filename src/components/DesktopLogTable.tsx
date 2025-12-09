import { useState, useMemo } from "react";
import type { ColumnsList } from "./ColumnsList";
import DetailsButton from "./DetailsButton";
import DesktopLogPagination from "./DesktopLogPagination";

interface Props {
  rows: ColumnsList[];
  loading: boolean;
  rowCount: number;
  page: number;
  pageSize: number;
  setPage: (p: number) => void;
  setPageSize: (s: number) => void;
}

const DesktopLogTableHeaders: string[] = ["ID", "IP Address", "Path", "Method", "Status", "Process Time", "Created At", "Details"];

export default function DesktopLogTable({ rows, loading, rowCount, page, pageSize, setPage, setPageSize }: Props) {
  const [filters, setFilters] = useState({
    method: "",
    status: "",
    path: "",
    ip: ""
  });

  const dataToUse =  rows;

  const filteredRows = useMemo(() => {
    return dataToUse.filter(row => {
      return (
        (!filters.method || row.method.toLowerCase().includes(filters.method.toLowerCase())) &&
        (!filters.status || row.status_code.toString().includes(filters.status)) &&
        (!filters.path || row.path.toLowerCase().includes(filters.path.toLowerCase())) &&
        (!filters.ip || row.ip_address.includes(filters.ip))
      );
    });
  }, [dataToUse, filters]);

  console.log("length: " + filteredRows.length)

  const paginatedRows = useMemo(() => {
    const startIndex = page * pageSize;
    return filteredRows.slice(startIndex, startIndex + pageSize);
  }, [filteredRows, page, pageSize]);

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(0); 
  };

  const clearFilters = () => {
    setFilters({ method: "", status: "", path: "", ip: "" });
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    if (status >= 400 && status < 500) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    if (status >= 500) return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case "GET": return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "POST": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "PUT": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "DELETE": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "PATCH": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case "OPTIONS": return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";


      default: return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 h-165">
               
          <div className="p-8 text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              <div className="flex items-center justify-center h-150">
                <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
              </div>
            </h3>
          </div>

      </div>
    );
  }

  return (
    <>
      {/* Header with Filters */}
      <div className="pb-7 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {/* Clear Filters */}
            {(filters.method || filters.status || filters.path || filters.ip) && (
              <button
                onClick={clearFilters}
                className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Filter Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 ml-0.5 mb-1">Method</label>
            <input
              type="text"
              placeholder="Filter by method..."
              value={filters.method}
              onChange={(e) => handleFilterChange("method", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 ml-0.5 mb-1">Status</label>
            <input
              type="text"
              placeholder="Filter by status..."
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 ml-0.5 mb-1">Path</label>
            <input
              type="text"
              placeholder="Filter by path..."
              value={filters.path}
              onChange={(e) => handleFilterChange("path", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 ml-0.5 mb-1">IP Address</label>
            <input
              type="text"
              placeholder="Filter by IP..."
              value={filters.ip}
              onChange={(e) => handleFilterChange("ip", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr> 
              {DesktopLogTableHeaders.map(header => 
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">{header}</th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {paginatedRows.length > 0 ? (
              paginatedRows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{row.id}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 font-mono">{row.ip_address}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100 max-w-xs truncate" title={row.path}>
                    {row.path}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-lg text-xs font-medium ${getMethodColor(row.method)}`}>
                      {row.method}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-lg text-xs font-medium ${getStatusColor(row.status_code)}`}>
                      {row.status_code}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">{row.process_time}ms</td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-gray-100">
                    {new Date(row.created_at).toLocaleString("en-US")}
                  </td>
                  <td className="px-4 py-3">
                    <DetailsButton logID={row.id} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-sm text-gray-500 dark:text-gray-400">
                  No logs found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredRows.length > 0 && (
        <DesktopLogPagination paginatedRows={paginatedRows} filteredRows={filteredRows} page={page} setPage={setPage} pageSize={pageSize} setPageSize={setPageSize}></DesktopLogPagination>
      )}
    </div>
    </>
  );
}