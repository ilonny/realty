import { List, Datagrid, TextField, EmailField } from "react-admin";

export const RealtyList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="name" label="Название" />
    </Datagrid>
  </List>
);
