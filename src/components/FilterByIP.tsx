import type { Filters } from "./LogBody";

interface Props {
  filters: Filters;
  handleFilterChange: (key: keyof Filters, value: string) => void;
}

export default function FilterByIP({filters, handleFilterChange}: Props) {
    return (
        <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 ml-0.5 mb-1">IP Address</label>
            <input
              type="text"
              placeholder="Filter by IP..."
              value={filters.ip}
              onChange={(e) => handleFilterChange("ip", e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
        </div>
    );
}