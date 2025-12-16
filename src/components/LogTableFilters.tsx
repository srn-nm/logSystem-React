import FilterByMethod from "./FilterByMethod";
import FilterByStatus from "./FilterByStatus";
import FilterByPath from "./FilterByPath";
import FilterByIP from "./FilterByIP";
import type { Filters } from "./LogBody";

interface Props {
    filters: Filters;
    setFilters: React.Dispatch<React.SetStateAction<Filters>>;
    setPage: (p: number) => void;
}

export default function LogTableDesktopFilters ({filters, setFilters, setPage}: Props) {

    const handleFilterChange = (key: keyof typeof filters, value: string) => {
        setFilters((prev: any) => ({ ...prev, [key]: value }));
        setPage(0); 
    };
    const clearFilters = () => {
        setFilters({ method: "", status: "", path: "", ip: "" });
    };

    return (
      <div className="pb-7 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex flex-wrap gap-2">

            {(filters.method || filters.status || filters.path || filters.ip) && (
              <button
                onClick={clearFilters}
                className="px-3 py-1.5 text-sm bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>


        {/*Desktop*/}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-4 hidden lg:grid">
          <FilterByMethod filters={filters} handleFilterChange={handleFilterChange}/>
          <FilterByPath filters={filters} handleFilterChange={handleFilterChange}/>
          <FilterByStatus filters={filters} handleFilterChange={handleFilterChange}/>
          <FilterByIP filters={filters} handleFilterChange={handleFilterChange}/>
        </div>

        {/*Mobile*/}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-3 mt-4 lg:hidden">
          <FilterByStatus filters={filters} handleFilterChange={handleFilterChange}/>
          <FilterByIP filters={filters} handleFilterChange={handleFilterChange}/>
        </div>

      </div>
    );
}