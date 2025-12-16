interface Props {
    selectedMethod: string;
    onMethodChange: (value: MethodType) => void;
    metrics: Record<string, any[]>;
    availableLabels: {
    hasStatus: boolean;
    hasMethod: boolean;
    statuses: string[];
    methods: string[];
  };
}
import type { MethodType } from "./MetricsDashboard";

export default function MethodSelector({selectedMethod, onMethodChange, metrics, availableLabels}: Props) {
    return(
        <select 
              value={selectedMethod}
              onChange={(e) => onMethodChange(e.target.value as MethodType)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="">All Methods</option>
              {availableLabels.methods.map(method => (
                <option key={method} value={method}>
                  {method.replaceAll("\"","")}
                </option>
              ))}
        </select>
    );
}