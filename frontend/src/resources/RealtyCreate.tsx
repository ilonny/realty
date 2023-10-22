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
  useGetList,
  SelectInput,
  AutocompleteInput,
} from "react-admin";
import authProvider from "../authProvider";
import { useEffect, useState } from "react";

export const RealtyCreate = () => {
  const districtData = useGetList("district");
  const roomsData = useGetList("rooms");
  const seriesData = useGetList("series");
  const stateData = useGetList("state");
  const typeData = useGetList("type");
  const categoryData = useGetList("category");
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
          source="agent_id"
          label="ID агента"
          hidden
          hiddenLabel
          validate={[required()]}
          fullWidth
          style={{ display: "none" }}
          defaultValue={userId}
        />
        <TextInput
          source="name"
          label="Название"
          validate={[required()]}
          fullWidth
        />
        <TextInput
          type="number"
          source="price"
          label="Цена"
          validate={[required()]}
          fullWidth
        />
        <AutocompleteInput
          label="Район"
          source="district_id"
          choices={districtData.data}
          optionText="name"
          optionValue="id"
          isLoading={districtData.isLoading}
          fullWidth
        />
        <AutocompleteInput
          label="Комнаты"
          source="rooms_id"
          choices={roomsData.data}
          optionText="name"
          optionValue="id"
          isLoading={roomsData.isLoading}
          fullWidth
        />
        <AutocompleteInput
          label="Серия"
          source="series_id"
          choices={seriesData.data}
          optionText="name"
          optionValue="id"
          isLoading={seriesData.isLoading}
          fullWidth
        />
        <AutocompleteInput
          label="Состояние"
          source="state_id"
          choices={stateData.data}
          optionText="name"
          optionValue="id"
          isLoading={stateData.isLoading}
          fullWidth
        />
        <AutocompleteInput
          label="Тип отношений"
          source="type_id"
          choices={typeData.data}
          optionText="name"
          optionValue="id"
          isLoading={typeData.isLoading}
          fullWidth
        />
        <AutocompleteInput
          label="Категория"
          source="category_id"
          choices={categoryData.data}
          optionText="name"
          optionValue="id"
          isLoading={categoryData.isLoading}
          fullWidth
        />
        <TextInput source="description" label="Описание" multiline fullWidth />
        <TextInput
          source="house_floor_number"
          label="Этажей в доме"
          fullWidth
        />
        <TextInput source="total_area" label="Общая площадь" fullWidth />
        <TextInput source="floor" label="Этаж" fullWidth />
        <TextInput
          source="documents"
          label="Правоустанавливающие документы"
          fullWidth
        />
        <TextInput source="rooms_count" label="Количество комнат" fullWidth />
        <TextInput
          source="description_additional"
          label="Особенности и удобства"
          fullWidth
        />
        <ImageInput source="photos" multiple>
          <ImageField source="src" title="title" />
        </ImageInput>
      </SimpleForm>
    </Create>
  );
};
