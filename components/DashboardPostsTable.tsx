import React from "react";
import { PostPreview } from "@/types/types";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Link from "next/link";

const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "Titre",
    width: 300,
    renderCell(params) {
      return <Link href={`/admin/edit/${params.value}`}>{params.value}</Link>;
    },
  },
  { field: "timestamp", headerName: "Date de création", width: 130 },
  { field: "actions", headerName: "Actions", width: 130 },
];

const DashboardPostsTable: React.FC<{ posts: PostPreview[] }> = ({ posts }) => {
  const rows = posts.map((p, i) => {
    return {
      ...p,
      timestamp: new Date().toLocaleDateString(),
      id: i,
    };
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

export default DashboardPostsTable;
