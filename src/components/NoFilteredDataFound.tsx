export default function NoFilteredDataFound() {
    return (
        <div className="p-8 text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
                No data found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
                No metrics match your current filters and search.
            </p>
        </div>
    );
}