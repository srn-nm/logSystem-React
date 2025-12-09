import { RefreshButton } from "./RefreshButton";

interface Props {
  callFetchTableData: () => void;
  loading: boolean;
}

export default function LogTableHeader({callFetchTableData, loading}: Props) {
    return (
        <div className="flex items-center justify-center p-4 pb-0 m-0">

          <div className="">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-200 ml-1">
              Log Table
            </h1>
          </div>

          <div className="pl-4">
            <RefreshButton 
              onRefresh={callFetchTableData} 
              loading={loading}
              tooltipTitle="Refresh Table Data"
            />
          </div>

      </div>
    );
}