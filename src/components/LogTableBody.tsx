import DesktopLogTable from "./DesktopLogTable";
import MobileLogTable from "./MobileLogTable";
import type { ColumnsList } from "./ColumnsList";

interface LogTableBodyProps {
  rows: ColumnsList[];
  loading: boolean;
  rowCount: number;
  page: number;
  pageSize: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
}

export default function LogTableBody({rows, loading, rowCount, page, pageSize, setPage, setPageSize}: LogTableBodyProps) {
    return (
        <div className="w-full bg-gray-100 dark:bg-gray-900 transition-colors p-4">
            
            {/*Desktop*/}
            <div className="hidden lg:block">
            <DesktopLogTable
                rows={rows}
                loading={loading}
                rowCount={rowCount}
                page={page}
                pageSize={pageSize}
                setPage={setPage}
                setPageSize={setPageSize}
            />
            </div>

            {/*Mobile*/}
            <div className="lg:hidden">
            <MobileLogTable
                rows={rows}
                loading={loading}
                rowCount={rowCount}
                page={page}
                pageSize={pageSize}
                setPage={setPage}
                setPageSize={setPageSize}
            />
            </div>

        </div>
    );
}