import { List, Datagrid, TextField, EmailField } from "react-admin";

export const UserList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="login" label="Логин" />
      <TextField source="name" label="Имя" />
      <TextField source="surname" label="Фамилия" />
      <TextField source="thirdname" label="Отчество" />
      <EmailField source="email" label="E-mail" />
      <TextField source="phone" label="Телефон" />
      <TextField source="deleted" label="Удален" />
    </Datagrid>
  </List>
);
