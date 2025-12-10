import type { DesktopFilters } from "./LogTableDesktop";

interface Props {
  filters: DesktopFilters;
  handleFilterChange: (key: keyof DesktopFilters, value: string) => void;
}

export default function FilterByPath({filters, handleFilterChange}: Props) {
    return (
        <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 ml-0.5 mb-1">Path</label>
            <input
              type="text"
              placeholder="Filter by path..."
              value={filters.path}
              onChange={(e) => handleFilterChange("path", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
        </div>
    );
}