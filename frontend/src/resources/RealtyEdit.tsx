import {
  SimpleForm,
  TextInput,
  required,
  ImageInput,
  ImageField,
  useGetList,
  AutocompleteInput,
  Edit,
} from "react-admin";
import authProvider from "../authProvider";
import React, { useEffect, useRef, useState } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
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
  const form = useFormContext();
  const values = form.getValues();
  const address = JSON.parse(values["address"] || "") || "";
  console.log("address", address);
  useEffect(() => {
    setTimeout(() => {
      console.log("mapRef", mapRef);
      const gmap = new window.google.maps.Map(mapRef.current, {
        center: address
          ? address.geometry.location
          : {
              lat: 59.96586,
              lng: 30.3055,
            },
        zoom: 10,
      });
      console.log("gmap", gmap);
      gmap.addListener("click", (e) => {
        console.log("click e: ", e);
        const lat = e.latLng.lat();
        const lng = e.latLng.lng();
      });
    }, 1000);
  }, []);

  const { ref: materialRef } = usePlacesWidget({
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
    },
  });

  return (
    <>
      <TextField
        key={address}
        defaultValue={address.formatted_address}
        placeholder="Введите адрес"
        label="Введите адрес"
        inputRef={materialRef}
        fullWidth
      />
      <div id="map" ref={mapRef} style={{ width: "100%", height: "300px" }} />
    </>
  );
};

export const RealtyEdit = () => {
  const districtData = useGetList("district");
  const roomsData = useGetList("rooms");
  const seriesData = useGetList("series");
  const stateData = useGetList("state");
  const typeData = useGetList("type");
  const categoryData = useGetList("category");
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
    <Edit mutationMode="optimistic">
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
        <AddressInput />

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
          multiple
        >
          <ImageField source="src" title="title" />
        </ImageInput>
      </SimpleForm>
    </Edit>
  );
};
