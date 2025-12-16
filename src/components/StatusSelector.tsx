interface Props {
    selectedStatus: string;
    onStatusChange: (value: StatusType) => void;
    metrics: Record<string, any[]>;
    availableLabels: {
    hasStatus: boolean;
    hasMethod: boolean;
    statuses: string[];
    methods: string[];
  };
}
import type { StatusType } from "./MetricsDashboard";

export default function StatusSelector({selectedStatus, onStatusChange, metrics, availableLabels}: Props) {
    return(
        <select 
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value as StatusType)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          >
            <option value="">All Statuses</option>
            {availableLabels.statuses.map(status => (
              <option key={status} value={status}>
                {status.replaceAll("\"","")}
              </option>
            ))}
        </select>
    );
}