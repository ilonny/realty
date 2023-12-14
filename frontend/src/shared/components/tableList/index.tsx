import {FC} from "react";
import {ownerColumns} from "../../../constants/app.constants";
import {CustomDataGrid} from "./styles";
import {GridColDef} from "@mui/x-data-grid";

interface ITableListProps {
    data: { [key: string]: any }[],
    columns: GridColDef[]
}

export const TableList: FC<ITableListProps> = ({data, columns}) => {
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
