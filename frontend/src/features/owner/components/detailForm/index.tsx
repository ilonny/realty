import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { TOwnerData } from "../../shared/types";
import { OwnerCard } from "../ownerCard";
import { Error, FormDataBlock, FormWrapper } from "./styled";
import { Grid } from "@mui/material";
import { Input, Select } from "../../../../shared/components/input";
import { API_URL } from "../../../../constants/globalApi.constants";

interface IDetailFormProps {
  data: TOwnerData;
  formData: TOwnerData;
  setFormData: Dispatch<SetStateAction<TOwnerData>>;
  isEditMode: boolean;
  ownerId: string;
  validErrors: { phone?: string; name?: string };
}

export const DetailForm: FC<IDetailFormProps> = ({
  data,
  formData,
  setFormData,
  isEditMode = { isEditMode },
  ownerId,
  validErrors,
}) => {
  const [category, setCategory] = useState([]);
  const [state, setState] = useState([]);
  const [district, setDistrict] = useState([]);
  const [apartmentComplex, setApartmentComplex] = useState([]);

  useEffect(() => {
    fetch(API_URL + "/" + "state", {
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setState(res);
      });
  }, []);

  useEffect(() => {
    fetch(API_URL + "/" + "district", {
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setDistrict(res);
      });
  }, []);

  useEffect(() => {
    fetch(API_URL + "/" + "apartment_complex", {
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setApartmentComplex(res);
      });
  }, []);

  useEffect(() => {
    fetch(API_URL + "/" + "category", {
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setCategory(res);
      });
  }, []);

  return (
    <FormWrapper>
      <OwnerCard data={data} ownerId={ownerId} />
      <FormDataBlock>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Input
              error={validErrors?.name}
              isEditMode={isEditMode}
              fullWidth
              labelTop={"ФИО*"}
              value={formData?.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            {isEditMode && validErrors?.name && (
              <Error>{validErrors?.name}</Error>
            )}
          </Grid>
          <Grid item xs={6}>
            <Input
              error={validErrors?.phone}
              isEditMode={isEditMode}
              fullWidth
              labelTop={"Телефон*"}
              value={formData?.phone}
              onChange={(e) =>
                setFormData((prev) =>
                  /\d+/.test(Number(e.target.value))
                    ? { ...prev, phone: e.target.value }
                    : prev
                )
              }
            />
            {isEditMode && validErrors?.phone && (
              <Error>{validErrors?.phone}</Error>
            )}
          </Grid>
          <Grid item xs={6}>
            <Input
              isEditMode={isEditMode}
              fullWidth
              labelTop={"Email"}
              value={formData?.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              isEditMode={isEditMode}
              fullWidth
              labelTop={"Категория"}
              value={formData?.category_id}
              data={category}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  category_id: e.target.value,
                }))
              }
            />
          </Grid>
          <Grid item xs={6}>
            <Input
              isEditMode={isEditMode}
              fullWidth
              labelTop={"Бюджет"}
              value={formData?.price}
              type={"number"}
              onChange={(e) =>
                setFormData((prev) =>
                  /\d+/.test(Number(e.target.value))
                    ? { ...prev, price: e.target.value }
                    : prev
                )
              }
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              isEditMode={isEditMode}
              fullWidth
              labelTop={"Состояние недвижимости"}
              value={formData?.state_id}
              data={state}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, state_id: e.target.value }))
              }
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              isEditMode={isEditMode}
              fullWidth
              labelTop={"Район недвижимости"}
              multiple
              value={formData?.district_id}
              data={district}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  district_id:
                    typeof e.target.value === "string"
                      ? e.target.value.split(",")
                      : e.target.value,
                }))
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Select
              isEditMode={isEditMode}
              fullWidth
              multiple
              labelTop={"Жилой комплекс недвижимости"}
              value={formData?.apartment_complex_id}
              data={apartmentComplex}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  apartment_complex_id:
                    typeof e.target.value === "string"
                      ? e.target.value.split(",")
                      : e.target.value,
                }))
              }
            />
          </Grid>
        </Grid>
      </FormDataBlock>
    </FormWrapper>
  );
};
