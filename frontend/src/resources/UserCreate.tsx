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

export const UserCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="login" validate={[required()]} fullWidth />
      <TextInput
        source="password"
        label="Пароль"
        validate={[required()]}
        fullWidth
      />
      <TextInput source="name" label="Имя" fullWidth />
      <TextInput source="surname" label="Фамилия" fullWidth />
      <TextInput source="thirdname" label="Отчество" fullWidth />
      <TextInput source="email" label="E-mail" fullWidth />
      <TextInput source="phone" label="Телефон" fullWidth />
      <TextInput source="other" label="Описание" multiline fullWidth />
      <ImageInput
        source="photo"
        placeholder={<p>Переместите фото сюда</p>}
        label="Фото"
      >
        <ImageField source="src" title="title" />
      </ImageInput>
    </SimpleForm>
  </Create>
);
