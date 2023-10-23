import { List, Datagrid, TextField, EmailField } from "react-admin";

export const OwnerList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="name" label="ФИО" />
      <TextField source="phone" label="Телефон" />
      <TextField source="email" label="E-mail" />
    </Datagrid>
  </List>
);
