import { useEffect, useState } from "react";
import {
  SimpleForm,
  TextInput,
  required,
  Edit,
  Show,
  SimpleShowLayout,
  TextField,
  SelectField,
  ReferenceField,
  useGetList,
  useRecordContext,
  useGetOne,
  FunctionField,
  ImageField,
  FormDataConsumer,
  useShowContext,
} from "react-admin";
import authProvider from "../authProvider";

const ImagesShow = () => {
  const { record } = useShowContext();
  // console.log("record", record);
  if (!record.photos) return null;
  try {
    const photos = JSON.parse(record.photos).map((p) => {
      return {
        src: import.meta.env.VITE_SIMPLE_REST_URL + "/" + p,
      };
    });
    return photos.map((p) => {
      return <img src={p.src} style={{ maxWidth: 500 }} />;
    });
  } catch (err) {
    return <></>;
  }
};

export const RealtyShow = () => {
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
    <Show actions={false}>
      <SimpleShowLayout>
        <TextField source="name" label="Название" />
        <TextField source="price" label="Цена" />
        <ReferenceField source="district_id" reference="district" label="Район">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="rooms_id" reference="rooms" label="Комнаты">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="series_id" reference="series" label="Серия">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="state_id" reference="state" label="Состояние">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField source="type_id" reference="type" label="Тип отношений">
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField
          source="category_id"
          reference="category"
          label="Категория"
        >
          <TextField source="name" />
        </ReferenceField>
        <TextField source="description" label="Описание" />
        <TextField source="house_floor_number" label="Этажей в доме" />
        <TextField source="total_area" label="Общая площадь" />
        <TextField source="floor" label="Этаж" />
        <TextField source="documents" label="Правоустанавливающие документы" />
        <TextField source="rooms_count" label="Количество комнат" />
        <TextField
          source="description_additional"
          label="Особенности и удобства"
        />
        <TextField
          source="description_additional"
          label="Особенности и удобства"
        />
        <ReferenceField
          source="developer_id"
          reference="developer"
          label="Застройщик"
        >
          <TextField source="name" />
        </ReferenceField>
        <ReferenceField
          source="apartment_complex_id"
          reference="apartment_complex"
          label="Жилой комплекс"
        >
          <TextField source="name" />
        </ReferenceField>
        <FunctionField
          label="Адрес"
          render={(record) => {
            if (record.address) {
              return JSON.parse(record.address).formatted_address;
            }
          }}
        />
        <TextField source="owner_name" label="ФИО собственника" fullWidth />
        <TextField
          source="owner_phone"
          label="Телефон собственника"
          fullWidth
        />
        <ImagesShow />
      </SimpleShowLayout>
    </Show>
  );
};
