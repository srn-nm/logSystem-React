import type { ColumnsList } from "./ColumnsList";

interface Props {
    paginatedRows: ColumnsList[];
    filteredRows: ColumnsList[];
    page: number;
    setPage: (s: number) => void;
    pageSize: number;
    setPageSize: (s: number) => void;
}

export default function LogPagination({paginatedRows, filteredRows, page, setPage, pageSize, setPageSize}: Props) {
    const totalPages = Math.ceil(filteredRows.length / pageSize);
    
    return (
        <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
            <div className="lg:hidden">
                <div className="flex items-center justify-between gap-2 w-full">
                    <button
                        onClick={() => setPage(page - 1)}
                        disabled={page === 0}
                        className="flex-1 px-3 py-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors text-center truncate"
                    >
                        Previous
                    </button>
                    
                    <div className="flex-1 px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 text-center truncate">
                        <span className="xs:inline">Page </span>{page + 1}<span className="xs:inline"> of {totalPages}</span>
                    </div>
                    
                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={page >= totalPages - 1}
                        className="flex-1 px-3 py-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-500 transition-colors text-center truncate"
                    >
                        Next
                    </button>
                </div>
                
                <div className="mt-3">
                    <select
                        value={pageSize}
                        onChange={(e) => setPageSize(Number(e.target.value))}
                        className="w-full px-3 py-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value={10}>10 per page</option>
                        <option value={25}>25 per page</option>
                        <option value={50}>50 per page</option>
                        <option value={100}>100 per page</option>
                    </select>
                </div>

                <div className="mt-2 text-center">
                    <span className="text-xs text-gray-600 dark:text-gray-400 px-2 py-1 ">
                        {paginatedRows.length} of {filteredRows.length} logs
                    </span>
                </div>
            </div>
            
            <div className="hidden lg:flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
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
                        Page {page + 1} of {totalPages}
                    </span>
                    
                    <button
                        onClick={() => setPage(page + 1)}
                        disabled={page >= totalPages - 1}
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
    );
}