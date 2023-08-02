import React from "react";
import { PostPreview } from "@/types/types";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";

const columns: GridColDef[] = [
  { field: "title", headerName: "Titre", width: 300 },
  { field: "timestamp", headerName: "Date de création", width: 130 },
  { field: "actions", headerName: "Actions", width: 130 },
];

const AdminPostsTable: React.FC<{ posts: PostPreview[] }> = ({ posts }) => {
  const rows = posts.map((p, i) => {
    return { ...p, timestamp: new Date().toLocaleDateString(), id: i };
  });
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};

export default AdminPostsTable;
