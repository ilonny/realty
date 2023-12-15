import { FC } from "react";
import { GridColDef, GridEventListener } from "@mui/x-data-grid";
import { CustomDataGrid, NoData } from "./styles";

interface ITableListProps {
  data: {
    [key: string]: any;
  }[];
  columns: GridColDef[];
  onClick?: GridEventListener<"rowClick">;
}

export const TableList: FC<ITableListProps> = ({ data, columns, onClick }) => {
  return (
    <>
      {data?.length ? (
        <CustomDataGrid
          rows={data}
          columns={columns}
          onRowClick={onClick}
          hideFooterPagination
          hideFooter
          disableColumnMenu
        />
      ) : (
        <NoData>Нет данных</NoData>
      )}
    </>
  );
};
