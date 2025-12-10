import { useState, useMemo } from "react";
import type { ColumnsList } from "./ColumnsList";
import DesktopLogPagination from "./DesktopLogPagination";
import LoadingTable from "./LoadingTable";
import LogTableDesktopFilters from "./LogTableDesktopFilters";
import LogTableTable from "./LogTableTable";

export type DesktopFilters = {
  method: string;
  status: string;
  path: string;
  ip: string;
};

interface Props {
  rows: ColumnsList[];
  loading: boolean;
  rowCount: number;
  page: number;
  pageSize: number;
  setPage: (p: number) => void;
  setPageSize: (s: number) => void;
}

export default function LogTableDesktop({ rows, loading, rowCount, page, pageSize, setPage, setPageSize }: Props) {
  const [filters, setFilters] = useState<DesktopFilters>({
    method: "",
    status: "",
    path: "",
    ip: ""
  });

  const dataToUse =  rows;

  const filteredRows = useMemo(() => {
    return dataToUse.filter(row => {
      return (
        (!filters.method || row.method.toLowerCase().includes(filters.method.toLowerCase())) &&
        (!filters.status || row.status_code.toString().includes(filters.status)) &&
        (!filters.path || row.path.toLowerCase().includes(filters.path.toLowerCase())) &&
        (!filters.ip || row.ip_address.includes(filters.ip))
      );
    });
  }, [dataToUse, filters]);

  const paginatedRows = useMemo(() => {
    const startIndex = page * pageSize;
    return filteredRows.slice(startIndex, startIndex + pageSize);
  }, [filteredRows, page, pageSize]);

  if (loading) {
    return (
      <LoadingTable/>
    );
  }

  return (
    <>
      {/* Filters */}
      <LogTableDesktopFilters filters={filters} setFilters={setFilters} setPage={setPage}/>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">

        <LogTableTable paginatedRows={paginatedRows}/>

        {/* Pagination */}
        {filteredRows.length > 0 && (
          <DesktopLogPagination paginatedRows={paginatedRows} filteredRows={filteredRows} page={page} setPage={setPage} pageSize={pageSize} setPageSize={setPageSize}></DesktopLogPagination>
        )}

      </div>
    </>
  );
}