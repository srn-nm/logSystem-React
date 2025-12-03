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


export default function MobileLogTable({ rows, loading, rowCount, page, pageSize, setPage, setPageSize }: Props) {
  const [filters, setFilters] = useState({
    status: "",
    ip: ""
  });

  const dataToUse = rows;

  // Filtered rows based on filters
  const filteredRows = useMemo(() => {
    return dataToUse.filter(row => {
      return (
        (!filters.status || row.status_code.toString().includes(filters.status)) &&
        (!filters.ip || row.ip_address.includes(filters.ip))
      );
    });
  }, [dataToUse, filters]);

  // Paginated data
  const paginatedRows = useMemo(() => {
    const startIndex = page * pageSize;
    return filteredRows.slice(startIndex, startIndex + pageSize);
  }, [filteredRows, page, pageSize]);

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(0);
  };

  const clearFilters = () => {
    setFilters({ status: "", ip: "" });
  };

  const getStatusColor = (status: number) => {
    if (status >= 200 && status < 300) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    if (status >= 400 && status < 500) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    if (status >= 500) return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
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
    <div className="space-y-4">
      {/* Mobile Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-3 ">
        <div className="flex items-center justify-between mb-0">
          {(filters.status || filters.ip) && (
            <button
              onClick={clearFilters}
              className="px-2 py-1 text-xs bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors mb-3"
            >
              Clear Filters
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Status</label>
            <input
              type="text"
              placeholder="Status..."
              value={filters.status}
              onChange={(e) => handleFilterChange("status", e.target.value)}
              className="w-full px-2 py-1.5 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">IP Address</label>
            <input
              type="text"
              placeholder="IP..."
              value={filters.ip}
              onChange={(e) => handleFilterChange("ip", e.target.value)}
              className="w-full px-2 py-1.5 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Mobile Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">IP Address</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedRows.length > 0 ? (
                paginatedRows.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    <td className="px-3 py-2 text-xs text-gray-900 dark:text-gray-100 font-medium">{row.id}</td>
                    <td className="px-3 py-2 text-xs text-gray-900 dark:text-gray-100 font-mono truncate max-w-[120px]" title={row.ip_address}>
                      {row.ip_address}
                    </td>
                    <td className="px-3 py-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium ${getStatusColor(row.status_code)}`}>
                        {row.status_code}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <DetailsButton logID={row.id} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-3 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                    No logs found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Pagination */}
        {filteredRows.length > 0 && (
          <div className="px-3 py-2 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
            <div className="flex flex-col items-center gap-2">
              <div className="text-xs text-gray-700 dark:text-gray-300 text-center">
                Showing {paginatedRows.length} of {filteredRows.length} logs
              </div>
              
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage(page - 1)}
                  disabled={page === 0}
                  className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors"
                >
                  ←
                </button>
                
                <span className="px-2 py-1 text-xs text-gray-700 dark:text-gray-300 min-w-[60px] text-center">
                  {page + 1} / {Math.ceil(filteredRows.length / pageSize)}
                </span>
                
                <button
                  onClick={() => setPage(page + 1)}
                  disabled={page >= Math.ceil(filteredRows.length / pageSize) - 1}
                  className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors"
                >
                  →
                </button>
              </div>
              
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="w-full max-w-[140px] px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={15}>15 per page</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}