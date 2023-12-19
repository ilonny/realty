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

export const DistrcitCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput
        source="name"
        label="Название"
        validate={[required()]}
        fullWidth
      />
    </SimpleForm>
  </Create>
);
