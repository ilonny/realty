import {
  List,
  Datagrid,
  TextField,
  EmailField,
  ReferenceField,
} from "react-admin";

export const OwnerList = () => (
  <List>
    <Datagrid rowClick="edit">
      <TextField source="id" label="ID" />
      <TextField source="name" label="ФИО" />
      <TextField source="phone" label="Телефон" />
      <TextField source="email" label="E-mail" />
      <ReferenceField
        source="agent_id"
        reference="user"
        label="Контакты агента"
        link={false}
      >
        <TextField source="name" /> <TextField source="phone" />
      </ReferenceField>
    </Datagrid>
  </List>
);
