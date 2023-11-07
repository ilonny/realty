import { useEffect, useState } from "react";
import {
  SimpleForm,
  TextInput,
  required,
  Edit,
  ReferenceInput,
  useGetList,
  SelectArrayInput,
  AutocompleteArrayInput,
  FormDataConsumer,
  Datagrid,
  TextField,
} from "react-admin";
import {
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";

import authProvider from "../authProvider";

const matchSuggestion = (filter, choice) => {
  return choice.name.toLowerCase().includes(filter.toLowerCase());
};

export const OwnerEdit = () => {
  const [userId, setUserId] = useState();
  const districtData = useGetList("district");
  const categoryData = useGetList("category");
  const apartment_complexData = useGetList("apartment_complex");
  const realtyData = useGetList("realty");

  const [realtyFilteredState, setRealtyFilteredState] = useState([]);

  const [agents, setAgents] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_SIMPLE_REST_URL + "/user/get-agents")
      .then((res) => res.json())
      .then((res) => setAgents(res));
  }, []);

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
        <FormDataConsumer>
          {({ formData }) => {
            let timeout;
            clearTimeout(timeout);
            let realtyFiltered = realtyData.data;
            // timeout = setTimeout(() => {
            if (Array.isArray(realtyFiltered)) {
              if (formData?.category_id) {
                try {
                  let category;
                  if (formData?.category_id === null) {
                    category = [];
                  } else if (Array.isArray(formData?.category_id)) {
                    category = formData?.category_id?.map((el) =>
                      el.toString()
                    );
                  } else {
                    category = formData?.category_id
                      ?.split(",")
                      ?.map((el) => el.toString());
                  }
                  if (category?.length) {
                    realtyFiltered = realtyFiltered.filter((realty) => {
                      if (category.includes(realty?.category_id?.toString())) {
                        return true;
                      }
                      return false;
                    });
                  }
                } catch (e) {
                  console.log("e", e);
                }
              }

              if (formData?.state_id) {
                try {
                  let state;
                  if (formData?.state_id === null) {
                    state = [];
                  } else if (Array.isArray(formData?.state_id)) {
                    state = formData?.state_id?.map((el) => el.toString());
                  } else {
                    state = formData?.state_id
                      ?.split(",")
                      ?.map((el) => el.toString());
                  }
                  if (state?.length) {
                    realtyFiltered = realtyFiltered.filter((realty) => {
                      if (state.includes(realty?.state_id?.toString())) {
                        return true;
                      }
                      return false;
                    });
                  }
                } catch (e) {
                  console.log("e", e);
                }
              }

              if (formData?.district_id) {
                try {
                  let district;
                  if (formData?.district_id === null) {
                    district = [];
                  } else if (Array.isArray(formData?.district_id)) {
                    district = formData?.district_id?.map((el) =>
                      el.toString()
                    );
                  } else {
                    district = formData?.district_id
                      ?.split(",")
                      ?.map((el) => el.toString());
                  }
                  if (district?.length) {
                    realtyFiltered = realtyFiltered.filter((realty) => {
                      if (district.includes(realty?.state_id?.toString())) {
                        return true;
                      }
                      return false;
                    });
                  }
                } catch (e) {
                  console.log("e", e);
                }
              }

              if (formData?.apartment_complex_id) {
                try {
                  let apartment_complex;
                  if (formData?.apartment_complex_id === null) {
                    apartment_complex = [];
                  } else if (Array.isArray(formData?.apartment_complex_id)) {
                    apartment_complex = formData?.apartment_complex_id?.map(
                      (el) => el.toString()
                    );
                  } else {
                    apartment_complex = formData?.apartment_complex_id
                      ?.split(",")
                      ?.map((el) => el.toString());
                  }
                  if (apartment_complex?.length) {
                    realtyFiltered = realtyFiltered.filter((realty) => {
                      if (
                        apartment_complex.includes(realty?.state_id?.toString())
                      ) {
                        return true;
                      }
                      return false;
                    });
                  }
                } catch (e) {
                  console.log("e", e);
                }
              }
              // setRealtyFilteredState(realtyFiltered || []);
            }
            // }, 1000);
            // console.log("realtyFiltered", realtyFiltered);
            return (
              <>
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
                <SelectArrayInput
                  format={(value) => {
                    if (Array.isArray(value)) {
                      return value;
                    }
                    return value?.split(",");
                  }}
                  label="Категория недвижимости"
                  choices={categoryData.data}
                  isLoading={categoryData.isLoading}
                  source="category_id"
                  optionText="name"
                  optionValue="id"
                  fullWidth
                />
                <TextInput source="price" label="Бюджет" fullWidth />
                <ReferenceInput
                  source="state_id"
                  reference="state"
                  label="Состояние недвижимости"
                >
                  <SelectArrayInput
                    format={(value) => {
                      if (Array.isArray(value)) {
                        return value;
                      }
                      return value?.split(",");
                    }}
                    label="Состояние недвижимости"
                    source="state_id"
                    optionText="name"
                    optionValue="id"
                    fullWidth
                  />
                </ReferenceInput>
                <AutocompleteArrayInput
                  format={(value) => {
                    if (Array.isArray(value)) {
                      return value;
                    }
                    return value?.split(",");
                  }}
                  choices={districtData.data || []}
                  matchSuggestion={matchSuggestion}
                  label="Район недвижимости"
                  source="district_id"
                  optionText="name"
                  optionValue="id"
                  fullWidth
                />
                <AutocompleteArrayInput
                  format={(value) => {
                    if (Array.isArray(value)) {
                      return value;
                    }
                    return value?.split(",");
                  }}
                  choices={apartment_complexData.data || []}
                  matchSuggestion={matchSuggestion}
                  label="Жилой комплекс недвижимости"
                  source="apartment_complex_id"
                  optionText="name"
                  optionValue="id"
                  fullWidth
                />
                <br />
                <br />
                <h3>Подходящая недвижимость: </h3>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Недвижимость ID</TableCell>
                      <TableCell>Название</TableCell>
                      <TableCell>Фото</TableCell>
                      <TableCell>Агент</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {realtyFiltered?.map((realty) => {
                      let photoSrc;
                      try {
                        photoSrc =
                          import.meta.env.VITE_SIMPLE_REST_URL +
                          "/" +
                          realty.main_photo;
                      } catch (e) {}
                      let agent = agents?.find((a) => a.id == realty.agent_id);
                      return (
                        <TableRow key={realty.id}>
                          <TableCell>{realty.id}</TableCell>
                          <TableCell>{realty.name}</TableCell>
                          <TableCell>
                            {photoSrc ? (
                              <img style={{ maxWidth: 200 }} src={photoSrc} />
                            ) : (
                              <p>Нет фото</p>
                            )}
                          </TableCell>
                          <TableCell>
                            {agent ? (
                              <p>
                                {agent.name} {agent.phone}
                              </p>
                            ) : (
                              <p>admin</p>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </>
            );
          }}
        </FormDataConsumer>
      </SimpleForm>
    </Edit>
  );
};
