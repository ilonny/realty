import {
  SimpleForm,
  TextInput,
  required,
  ImageInput,
  ImageField,
  useGetList,
  AutocompleteInput,
  Create,
  FormDataConsumer,
  SelectInput,
  useNotify,
  useRedirect,
} from "react-admin";
import authProvider from "../authProvider";
import React, { useEffect, useRef, useState } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
import { useFormContext } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { Loader } from "@googlemaps/js-api-loader";

const loader = new Loader({
  apiKey: "AIzaSyBbDfrPKMdXXJ4i1TVofmhrJOG7nsPDz0U",
  version: "weekly",
  libraries: ["places", "maps"],
});

const AddressInput = () => {
  const mapRef = useRef();
  const gmapRef = useRef();
  const form = useFormContext();
  const values = form.getValues();
  let address = "";
  try {
    address = JSON.parse(values["address"] || "") || "";
  } catch (err) {}

  const placesService = usePlacesService({});

  const { ref: materialRef, autocompleteRef } = usePlacesWidget({
    apiKey: "AIzaSyBbDfrPKMdXXJ4i1TVofmhrJOG7nsPDz0U",
    inputAutocompleteValue: address.formatted_address,
    onPlaceSelected: (place) => {
      form.setValue("address", JSON.stringify(place));

      form.control._updateFormState({
        dirtyFields: { documents: true },
        isDirty: true,
        isValid: true,
      });
      // form.formState.isDirty = true;
      form.trigger("address");
      form.trigger("documents");
      const lat = place?.geometry?.location?.lat();
      const lng = place?.geometry?.location?.lng();
      gmapRef.current?.setCenter({ lat, lng });
      console.log("gmapRef", gmapRef.current?.setCenter);
    },
  });

  const findPlaceByCoords = (lat, lng) => {
    let geocoder = new window.google.maps.Geocoder();
    geocoder.geocode(
      {
        latLng: { lat, lng },
      },
      (cb) => {
        console.log("cb?", cb);
        if (!cb?.length) {
          return;
        }
        form.setValue("address", JSON.stringify(cb[0]));

        form.control._updateFormState({
          dirtyFields: { documents: true },
          isDirty: true,
          isValid: true,
        });
        // form.formState.isDirty = true;
        form.trigger("address");
        form.trigger("documents");
        materialRef.current.value = cb[0].formatted_address;
      }
    );
  };

  useEffect(() => {
    const gmap = new window.google.maps.Map(mapRef.current, {
      center: address
        ? address.geometry.location
        : {
            lat: 42.8756504,
            lng: 74.5910862,
          },
      zoom: 13,
    });

    gmap.addListener("click", (e) => {
      console.log("click e: ", e);
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      findPlaceByCoords(lat, lng);
      // findPlaceByCoords(lat, lng);

      // console.log('geocoder', geocoder)
    });
    gmapRef.current = gmap;
  }, []);

  return (
    <>
      <TextField
        key={address}
        defaultValue={address.formatted_address}
        placeholder="Введите адрес"
        label="Выберите адрес на карте"
        inputRef={materialRef}
        fullWidth
      />
      <div id="map" ref={mapRef} style={{ width: "100%", height: "300px" }} />
    </>
  );
};

export const RealtyCreate = () => {
  const notify = useNotify();
  const redirect = useRedirect()
  const districtData = useGetList("district");
  const roomsData = useGetList("rooms");
  const seriesData = useGetList("series");
  const stateData = useGetList("state");
  const typeData = useGetList("type");
  const categoryData = useGetList("category");
  const ownerData = useGetList("owner");
  const developerData = useGetList("developer");
  const apartment_complexData = useGetList("apartment_complex");
  const communicationData = useGetList("communication");
  const documentData = useGetList("document");
  const [userId, setUserId] = useState();
  const [gmapsLoaded, setGmapsLoaded] = useState(false);

  useEffect(() => {
    authProvider?.getIdentity &&
      authProvider?.getIdentity().then((user) => {
        setUserId(user.id);
      });
    loader.importLibrary("maps").then(() => {
      setGmapsLoaded(true);
    });
  }, []);

  if (!userId) {
    return null;
  }

  if (!gmapsLoaded) {
    return null;
  }

  return (
    <Create
      mutationOptions={{
        onSuccess(data, variables, context) {
          notify("success", "info");
        },
        onError(data, variables, context) {
          // console.log("error data", data);
          // // notify("success");
          redirect('/realty')

        },
        useErrorBoundary: false,
      }}
    >
      <SimpleForm>
        <FormDataConsumer>
          {({ formData }) => {
            // console.log("formData", formData);
            return (
              <div>
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
                <AutocompleteInput
                  label="Категория"
                  source="category_id"
                  choices={categoryData.data}
                  optionText="name"
                  optionValue="id"
                  isLoading={categoryData.isLoading}
                  fullWidth
                />
                {formData.category_id != 3 ? (
                  <AutocompleteInput
                    label="Серия"
                    source="series_id"
                    choices={seriesData.data}
                    optionText="name"
                    optionValue="id"
                    isLoading={seriesData.isLoading}
                    fullWidth
                  />
                ) : (
                  <></>
                )}
                {formData.category_id == 3 ? (
                  <>
                    <AutocompleteInput
                      label="Застройщик"
                      source="developer_id"
                      choices={developerData.data}
                      optionText="name"
                      optionValue="id"
                      isLoading={developerData.isLoading}
                      fullWidth
                    />
                    <AutocompleteInput
                      label="Жилой комплекс"
                      source="apartment_complex_id"
                      choices={apartment_complexData.data}
                      optionText="name"
                      optionValue="id"
                      isLoading={apartment_complexData.isLoading}
                      fullWidth
                    />
                  </>
                ) : (
                  <></>
                )}
                {/* <AutocompleteInput
                  label="Собственник"
                  source="owner_id"
                  choices={ownerData.data}
                  optionText="name"
                  optionValue="id"
                  isLoading={ownerData.isLoading}
                  fullWidth
                /> */}
                <br />
                <br />
                <AddressInput />
                <AutocompleteInput
                  label="Район"
                  source="district_id"
                  choices={districtData.data}
                  optionText="name"
                  optionValue="id"
                  isLoading={districtData.isLoading}
                  fullWidth
                />
                <br />
                <br />
                <TextInput
                  source="total_area"
                  label="Общая площадь"
                  fullWidth
                />
                {/* <TextInput
                  source="rooms_count"
                  label="Количество комнат"
                  fullWidth
                /> */}
                <AutocompleteInput
                  label="Количество комнат"
                  source="rooms_id"
                  choices={roomsData.data}
                  optionText="name"
                  optionValue="id"
                  isLoading={roomsData.isLoading}
                  fullWidth
                />
                <TextInput source="floor" label="Этаж" fullWidth />
                <TextInput
                  source="house_floor_number"
                  label="Этажей в доме"
                  fullWidth
                />
                <SelectInput
                  label="Балкон"
                  source="balcony"
                  optionText="label"
                  optionValue="value"
                  fullWidth
                  choices={[
                    {
                      value: "",
                      label: "Нет",
                    },
                    {
                      value: "balcony",
                      label: "Балкон",
                    },
                    {
                      value: "loggia",
                      label: "Лоджия",
                    },
                  ]}
                />
                <SelectInput
                  label="Застекление"
                  source="balcony_glass"
                  optionText="label"
                  optionValue="value"
                  fullWidth
                  choices={[
                    {
                      value: "0",
                      label: "Нет",
                    },
                    {
                      value: "1",
                      label: "Да",
                    },
                  ]}
                />
                <AutocompleteInput
                  label="Коммуникации"
                  source="communication_id"
                  choices={communicationData.data}
                  optionText="name"
                  optionValue="id"
                  isLoading={communicationData.isLoading}
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
                <br />
                <br />
                <AutocompleteInput
                  label="Правоустанавливающие документы"
                  source="document_id"
                  choices={documentData.data}
                  optionText="name"
                  optionValue="id"
                  isLoading={documentData.isLoading}
                  fullWidth
                />
                <TextInput
                  type="number"
                  source="price"
                  label="Цена"
                  validate={[required()]}
                  fullWidth
                />
                <TextInput
                  type="number"
                  source="agent_price"
                  label="Цена на руки для собственника"
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
                <TextInput
                  source="description"
                  label="Описание"
                  multiline
                  fullWidth
                />
                <TextInput
                  source="owner_name"
                  label="ФИО собственника"
                  fullWidth
                />
                <TextInput
                  source="owner_phone"
                  label="Телефон собственника"
                  fullWidth
                />
                <br />
                <br />
                <ImageInput
                  format={(f) => {
                    try {
                      if (typeof f === "object") {
                        return f;
                      }
                      const res = {
                        src: f,
                      };

                      return res;
                    } catch (e) {}
                  }}
                  source="main_photo"
                  label="Главное фото"
                >
                  <ImageField source="src" title="title" />
                </ImageInput>
                <ImageInput
                  format={(f) => {
                    try {
                      if (typeof f === "object") {
                        return f;
                      }
                      const res = JSON.parse(f).map((s) => ({
                        src: import.meta.env.VITE_SIMPLE_REST_URL + "/" + s,
                      }));
                      return res;
                    } catch (e) {}
                  }}
                  source="photos"
                  label="Галерея фотографий"
                  multiple
                >
                  <ImageField source="src" title="title" />
                </ImageInput>
              </div>
            );
          }}
        </FormDataConsumer>
      </SimpleForm>
    </Create>
  );
};
