export default function NoMetricSelected() {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                Select a metric to view its chart
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
                Choose from the dropdown menu above
            </p>
        </div>
    );
}