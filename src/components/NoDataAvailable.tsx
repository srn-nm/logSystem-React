export default function NoDataAvailable() {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              No metrics data available
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try refreshing the metrics or check your data source
            </p>
          </div>
    );
}