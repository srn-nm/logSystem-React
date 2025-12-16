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

          {/* Desktop Header  */}
          <div className="hidden md:flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 p-2 pl-0">
              <div>{metricName}</div>
            </h3>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Sum of Values: {totalSum.toLocaleString()} &nbsp;|&nbsp; Number of Items: {sortedData.length} &nbsp;|&nbsp;  Average Value: {totalSum > 0 ? (totalSum / sortedData.length).toLocaleString(undefined, { maximumFractionDigits: 2 }) : 0}
            </div>
          </div>
          
          {/* Mobile Header */}
          <div className="md:hidden mb-4">
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">
              {metricName}
            </h3>
            <div className="flex flex-wrap gap-2 text-xs text-gray-600 dark:text-gray-400 pt-1 mb-5">
              <span className="bg-gray-100 dark:bg-gray-800  rounded">
                Sum: {totalSum.toLocaleString()}
              </span>
              <span className="bg-gray-100 dark:bg-gray-800 rounded">
                Items: {sortedData.length}
              </span>
              <span className="bg-gray-100 dark:bg-gray-800 rounded">
                Avg: {totalSum > 0 ? (totalSum / sortedData.length).toLocaleString(undefined, { maximumFractionDigits: 1 }) : 0}
              </span>
            </div>
          </div>
          
          <hr className="mb-5 border-t-2 border-gray-600"></hr>
        
          {/* Desktop Layout */}
          <div className="hidden md:block space-y-2 max-h-140 overflow-y-auto">
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
          
          {/* Mobile Layout */}
          <div className="md:hidden space-y-3 max-h-96 overflow-y-auto">
            {sortedData.map((metric, index) => {
              const percentage = totalSum > 0 ? (metric.value / totalSum) * 100 : 0;
              
              const handler = metric.labels.handler || metric.labels.method || "Unlabeled";
              const displayHandler = handler.length > 30 
                ? handler.substring(0, 27) + "..." 
                : handler;
              
              return (
                <div key={index} className="w-full">

                  <div className="text-sm text-gray-700 dark:text-gray-300 mb-1 truncate">
                    {displayHandler}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-6 bg-gray-200 dark:bg-gray-700 rounded overflow-hidden">
                      <div
                        className="h-full bg-blue-500 flex items-center"
                        style={{ width: `${percentage}%` }}
                      >
                        {percentage > 20 && (
                          <span className="text-xs text-white px-2">
                            {percentage.toFixed(0)}%
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-[50px] text-right">
                      {metric.value > 999 ? `${(metric.value/1000).toFixed(1)}k` : metric.value}
                    </div>
                  </div>
                  
                  {percentage <= 20 && (
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-0">
                      {percentage.toFixed(1)}%
                    </div>
                  )}
                </div>
              );
            })}
          </div>
      </div>
    );
}