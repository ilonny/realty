import { useState } from "react";
import { List, Datagrid, TextField, EmailField } from "react-admin";
import authProvider from "../authProvider";

export const UserList = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  authProvider?.getIdentity &&
    authProvider?.getIdentity().then((user) => {
      setIsAdmin(user.role === "admin");
    });
  return (
    <List actions={isAdmin ? undefined : false}>
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
};
