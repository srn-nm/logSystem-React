import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import DetailsButton from "./detailsButton";
import type { ColumnsList } from "./DataTable";

interface Props {
  rows: ColumnsList[];
  loading: boolean;
  rowCount: number;
  page: number;
  pageSize: number;
  setPage: (p: number) => void;
  setPageSize: (s: number) => void;
}

export default function MobileDataGrid({
  rows,
  loading,
  rowCount,
  page,
  pageSize,
  setPage,
  setPageSize,
}: Props) {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "ip_address", headerName: "IP", flex: 1 },
    { field: "status_code", headerName: "Status", flex: 1 },
    { field: "details", headerName: "Details", width: 70, sortable: false, renderCell: () => <DetailsButton />, },
  ];

  return (
    <Box sx={{ flex: 1, position: 'relative' }}>
    <Box sx={{ position: 'absolute', inset: 0 }}>
    <Box sx={{ height: "calc(100vh - 250px)", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        pagination
        paginationMode="server"
        paginationModel={{ page, pageSize }}
        onPaginationModelChange={(model) => {
          setPage(model.page);
          setPageSize(model.pageSize);
        }}
        rowCount={rowCount}
        pageSizeOptions={[10, 25, 100]}
        disableRowSelectionOnClick
        scrollbarSize={0} 
        sx={gridStyle}
        onFilterModelChange={(filterModel) => {
          // fetchDataFromBackend({
          //   page,
          //   pageSize,
          //   filters: filterModel.items,
          // });
        }}
      />
    </Box>
    </Box>
    </Box>
  );
}

const gridStyle = {
  color: "#e5e7eb",
  backgroundColor: "#1f2937",
    "& .MuiDataGrid-columnHeader": { 
        backgroundColor: "#374151",
        color: "#e5e7eb", 
    }, 
    "& .MuiDataGrid-cell": { 
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis", 
        color: "#e5e7eb", 
        borderBottom: "1px solid #4b5563",
    }, 
    "& .MuiDataGrid-footerContainer": { 
        backgroundColor: "#1f2937", 
        color: "#e5e7eb", 
    }, 
    "& .MuiDataGrid-virtualScroller": {
         backgroundColor: "#1f2937",
    }, 
    "& .MuiDataGrid-row:hover": { 
        backgroundColor: "#4b5563", 
        color: "#f9fafb", 
    },
    "& .MuiTablePagination-root": { 
        color: "#e5e7eb", 
    }, 
    "& .MuiTablePagination-select": { 
        color: "#e5e7eb", backgroundColor: "#374151",
    }, 
    "& .MuiSelect-icon": { 
        color: "#e5e7eb",
    },

    "& ::-webkit-scrollbar": {
    width: "10px"
    },
    "& ::-webkit-scrollbar-track": {
      backgroundColor: "#1f2937"
    },
    "& ::-webkit-scrollbar-thumb": {
      borderRadius: "10px",
      boxShadow: "inset 0 0 6px rgba(0,0,0,.3)",
      backgroundColor: "#4b5563"
    },
};
