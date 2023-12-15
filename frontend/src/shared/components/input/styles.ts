import { styled, TextField } from "@mui/material";
import Select from "@mui/material/Select";

export const CustomInput = styled(TextField)`
  padding: 10px 16px;
  border-radius: 6px;
  border: 1px solid #202020;
  background: #fff;
`;

export const Label = styled("label")`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #222;
  font-feature-settings: "clig" off, "liga" off;
  font-family: Roboto, sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
`;

export const CustomSelect = styled(Select)`
  border-radius: 6px;
  border: 1px solid #202020;
  background: #fff;
  min-height: 54px;

  & .MuiSelect-select {
    padding: 10px 16px;
  }
`;
