import {
  List,
  Datagrid,
  TextField,
  EmailField,
  Create,
  SimpleForm,
  TextInput,
  required,
  Edit,
  ImageInput,
  ImageField,
  FormDataConsumer,
} from "react-admin";

export const UserEdit = (props) => {
  console.log("props", props);
  return (
    <Edit>
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
          placeholder={<p>Переместите новое фото сюда</p>}
          label="Фото"
        >
          <ImageField source="src" title="title" />
        </ImageInput>
        <br />
        <h2>Старое фото:</h2>
        <FormDataConsumer>
          {({ formData, ...rest }) => {
            return (
              <img
                style={{ maxWidth: 300 }}
                src={
                  import.meta.env.VITE_SIMPLE_REST_URL + "/" + formData.photo
                }
              />
            );
          }}
        </FormDataConsumer>
      </SimpleForm>
    </Edit>
  );
};
