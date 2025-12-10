import DetailsButton from "./DetailsButton";
import type { ColumnsList } from "./ColumnsList";

const DesktopLogTableHeaders: string[] = ["ID", "IP Address", "Path", "Method", "Status", "Process Time", "Created At", "Details"];
interface Props {
    paginatedRows: ColumnsList[];
}

export default function LogTableTable ({paginatedRows}: Props) {

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

    return (
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
    );
}