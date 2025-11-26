import { useState, useMemo } from "react";
import type { ColumnsList } from "./LogTable";
import DetailsButton from "./DetailsButton";

interface Props {
  rows: ColumnsList[];
  loading: boolean;
  rowCount: number;
  page: number;
  pageSize: number;
  setPage: (p: number) => void;
  setPageSize: (s: number) => void;
}

// Mock data for demonstration
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
  },
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
  },
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

export default function DesktopDataGrid({ rows, loading, rowCount, page, pageSize, setPage, setPageSize }: Props) {
  const [filters, setFilters] = useState({
    method: "",
    status: "",
    path: "",
    ip: ""
  });

  const dataToUse =  mockData  //rows;

  // Filtered rows based on filters
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

  // paginated data
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
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex space-x-4">
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
            </div>
          ))}
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
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">IP Address</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Path</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Method</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Process Time</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Created At</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Details</th>
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
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getMethodColor(row.method)}`}>
                      {row.method}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(row.status_code)}`}>
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
        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Showing {paginatedRows.length} of {filteredRows.length} logs
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 0}
                className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors"
              >
                Previous
              </button>
              
              <span className="px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300">
                Page {page + 1} of {Math.ceil(filteredRows.length / pageSize)}
              </span>
              
              <button
                onClick={() => setPage(page + 1)}
                disabled={page >= Math.ceil(filteredRows.length / pageSize) - 1}
                className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors"
              >
                Next
              </button>
              
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="px-3 py-1.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={10}>10 per page</option>
                <option value={25}>25 per page</option>
                <option value={50}>50 per page</option>
                <option value={100}>100 per page</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );

}