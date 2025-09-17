import { useContext, useState } from "react";
import DataContext from "../contexts/dataContext";

interface Column {
  id: keyof Data;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

interface Data {
  name: string;
  code: string;
  population: number;
  size: number;
  density: number;
}

const columns: Column[] = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "code", label: "ISO Code", minWidth: 100 },
  {
    id: "population",
    label: "Population",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "size",
    label: "Size (km²)",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("en-US"),
  },
  {
    id: "density",
    label: "Density",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];

function createData(name: string, code: string, population: number, size: number): Data {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows: Data[] = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
];

export default function DataTable() {

  const context = useContext(DataContext);
  if (!context) return <div>Context not available</div>;
  const { searchInput } = context;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filteredRows = rows.filter((row) =>
  row.name.toLowerCase().includes(searchInput.toLowerCase()) ||
  row.code.toLowerCase().includes(searchInput.toLowerCase())
);

  const paginatedRows = filteredRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const totalPages = Math.ceil(filteredRows.length / rowsPerPage);

  return (
    <div className="w-full bg-gray-100 dark:bg-gray-900 transition-colors">
      <div className="overflow-x-auto rounded-l shadow-lg bg-white dark:bg-gray-800 transition-colors">
        <table className="min-w-full table-auto">
          <thead className="sticky top-0 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-200 transition-colors">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.id}
                  className={`px-4 py-3 text-sm font-semibold ${
                    column.align === "right" ? "text-right" : "text-left"
                  }`}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedRows.map((row) => (
              <tr
                key={row.code}
                className="border-b border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-200 transition-colors"
              >
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <td
                      key={column.id}
                      className={`px-4 py-2 text-sm ${
                        column.align === "right" ? "text-right" : "text-left"
                      } text-gray-900 dark:text-gray-100`}
                    >
                      {column.format && typeof value === "number" ? column.format(value) : value}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4 text-gray-900 dark:text-gray-200">
        <div className="text-sm">
          <select
            value={rowsPerPage}
            
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
              setPage(0);
            }}
            className="ml-2 p-0 mr-2 rounded bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-200"
          >
            {[10, 25, 100].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
         :تعداد ردیف ها 
        </div>
        <div className="flex items-center gap-2 text-sm">
          <button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
            disabled={page >= totalPages - 1}
            className="px-3 py-1 text-gray-900 dark:text-gray-200 disabled:opacity-50"
          >
            &lt;
          </button>
          <span>
            صفحه {page + 1}  از {totalPages}
          </span>
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
            disabled={page === 0}
            className="px-3 py-1 text-gray-900 dark:text-gray-200 disabled:opacity-50"
          >
            &gt;
          </button>
          
        </div>
      </div>
    </div>
  );
}