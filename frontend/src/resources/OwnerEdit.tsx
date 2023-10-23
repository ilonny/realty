import { useEffect, useState } from "react";
import { SimpleForm, TextInput, required, Edit } from "react-admin";
import authProvider from "../authProvider";

export const OwnerEdit = () => {
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
    <Edit>
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
    </Edit>
  );
};
