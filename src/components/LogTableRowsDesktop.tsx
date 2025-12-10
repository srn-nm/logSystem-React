import type { ColumnsList } from "./ColumnsList";
import DetailsButton from "./DetailsButton";

interface Props {
    row: ColumnsList;
    getMethodColor: (status: string) => void;
    getStatusColor: (status: number) => void;
}

export default function LogTableRowsDesktop({row, getMethodColor, getStatusColor}: Props) {
    return (
        <>
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
        </>
    );
}