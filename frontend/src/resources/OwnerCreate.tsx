import { useEffect, useState } from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  required,
  ReferenceInput,
  useGetList,
  SelectArrayInput,
  AutocompleteArrayInput,
} from "react-admin";
import authProvider from "../authProvider";

const matchSuggestion = (filter, choice) => {
  return choice.name.toLowerCase().includes(filter.toLowerCase());
};

export const OwnerCreate = () => {
  const [userId, setUserId] = useState();
  const districtData = useGetList("district");
  const apartment_complexData = useGetList("apartment_complex");
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
        <ReferenceInput
          source="category_id"
          reference="category"
          label="Категория недвижимости"
        >
          <SelectArrayInput
            label="Категория недвижимости"
            source="category_id"
            optionText="name"
            optionValue="id"
            fullWidth
          />
        </ReferenceInput>
        <TextInput source="price" label="Бюджет" fullWidth />
        <ReferenceInput
          source="state_id"
          reference="state"
          label="Состояние недвижимости"
        >
          <SelectArrayInput
            label="Состояние недвижимости"
            source="state_id"
            optionText="name"
            optionValue="id"
            fullWidth
          />
        </ReferenceInput>
        <AutocompleteArrayInput
          choices={districtData.data || []}
          matchSuggestion={matchSuggestion}
          label="Район недвижимости"
          source="district_id"
          optionText="name"
          optionValue="id"
          fullWidth
        />
        <AutocompleteArrayInput
          choices={apartment_complexData.data || []}
          matchSuggestion={matchSuggestion}
          label="Жилой комплекс недвижимости"
          source="apartment_complex_id"
          optionText="name"
          optionValue="id"
          fullWidth
        />
      </SimpleForm>
    </Create>
  );
};
