import { GridColDef } from "@mui/x-data-grid";
import { CustomDataGrid } from "./styles";
import {FC} from "react";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  {
    field: "name",
    headerName: "ФИО",
    flex: 1,
  },
  {
    field: "phone",
    headerName: "Телефон",
    flex: 1,
  },
  {
    field: "mail",
    headerName: "E-mail",
    flex: 1,
  },
  {
    field: "agent_id",
    headerName: "Контакты агента",
    flex: 1,
  },
];


export const TableList:FC<{data: { [key: string]: any }[]}> = ({data}) => {
  return (
    <CustomDataGrid
      rows={data}
      columns={columns}
      hideFooterPagination
      hideFooter
      disableColumnMenu
    />
  );
};
