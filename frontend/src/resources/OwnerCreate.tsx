import { useEffect, useState } from "react";
import {
  List,
  Datagrid,
  TextField,
  EmailField,
  Create,
  SimpleForm,
  TextInput,
  required,
  ImageInput,
  ImageField,
} from "react-admin";
import authProvider from "../authProvider";

export const OwnerCreate = () => {
  const [userId, setUserId] = useState();
  useEffect(() => {
    authProvider?.getIdentity &&
      authProvider?.getIdentity().then((user) => {
        setUserId(user.id);
      });
  }, []);

  if (!userId) {
    return null;
  }

  return (
    <Create>
      <SimpleForm>
        <TextInput
          source="name"
          label="ФИО"
          validate={[required()]}
          fullWidth
        />
        <TextInput
          source="phone"
          label="Телефон"
          validate={[required()]}
          fullWidth
        />
        <TextInput source="email" label="E-mail" fullWidth />
        <TextInput
          source="agent_id"
          defaultValue={userId.toString()}
          style={{ display: "none" }}
        />
      </SimpleForm>
    </Create>
  );
};
