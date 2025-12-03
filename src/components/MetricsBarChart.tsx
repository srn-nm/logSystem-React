interface MetricType {
  labels: Record<string, string>;
  value: number;
}

function getMetricLabel(metric: MetricType, metricName: string): string {
    const labels = Object.entries(metric.labels);
    if (labels.length > 0) {
        return labels.map(([key, value]) => `${key}: ${value}`).join(" | ");
    }
    return "Unlabeled";
}

export default function BarChart({ metricName, metricData }: { metricName: string; metricData: MetricType[] }) {

    const totalSum = metricData.reduce((sum, metric) => sum + metric.value, 0);
    const sortedData = [...metricData].sort((a, b) => b.value - a.value);

    return (
        <div className="horizontal-bar-chart p-4 scrollbar-dark" >

        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 p-2 pl-0">
            <div>{metricName}</div>
          </h3>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Sum of Values: {totalSum.toLocaleString()} &nbsp;|&nbsp; Number of Items: {sortedData.length} &nbsp;|&nbsp;  Average Value: {totalSum > 0 ? (totalSum / sortedData.length).toLocaleString(undefined, { maximumFractionDigits: 2 }) : 0}
          </div>
        </div>
        <hr className="mb-5 border-t-2 border-gray-600"></hr>
        
        <div className="space-y-2 max-h-140 overflow-y-auto">
          {sortedData.map((metric, index) => {
            const percentage = totalSum > 0 ? (metric.value / totalSum) * 100 : 0;
            
            return (
              <div key={index} className="flex items-center gap-3">
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-gray-700 dark:text-gray-300 truncate">
                    {getMetricLabel(metric, metricName)}
                  </div>
                </div>
                <div className="flex-2 w-full max-w-2xl">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden relative">
                    <div
                      className="h-full bg-blue-500 transition-all duration-300 ease-in-out flex items-center justify-between px-3 text-white text-sm font-medium"
                      style={{ width: `${percentage}%` }}
                    >
                      <span>{percentage.toFixed(1)}%&nbsp;&nbsp;&nbsp;</span>
                      <span>{metric.value.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
}