interface Props {
    selectedMetric: string;
    onMetricChange: (value: string) => void;
    metrics: Record<string, any[]>;
}

export default function MetricSelector({selectedMetric, onMetricChange, metrics}: Props) {
    return(
        <select 
            value={selectedMetric}
            onChange={(e) => onMetricChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
            <option value="">Select Metric...</option>
            {Object.keys(metrics).map(metricName => (
                <option key={metricName} value={metricName}>
                {metricName}
                </option>
            ))}
        </select>  
    );
}