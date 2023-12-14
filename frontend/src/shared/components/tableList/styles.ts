import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material";

export const CustomDataGrid = styled(DataGrid)`
  background: #fff;
  border-radius: 0;
  border: none;

  & .MuiDataGrid-cell {
    padding: 16px;
    color: #000;
    font-family: Roboto, sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.17px;
  }

  & .MuiDataGrid-columnSeparator {
    display: none;
  }

  & .MuiDataGrid-columnHeader {
    padding: 0;
  }

  & .MuiDataGrid-columnHeaderTitleContainer {
    padding: 16px;
  }

  & .MuiDataGrid-cell:focus,
  .MuiDataGrid-columnHeader:focus,
  .MuiDataGrid-columnHeader:focus-within {
    outline: none !important;
  }
`;
