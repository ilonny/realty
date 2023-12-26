import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import { TOwnerData } from "../../shared/types";
import { OwnerCard } from "../ownerCard";
import { Error, FormDataBlock, FormWrapper } from "./styled";
import { Grid } from "@mui/material";
import { Input, Select } from "../../../../shared/components/input";
import { API_URL } from "../../../../constants/globalApi.constants";
import { RecommendRealty } from "../recommendRealty";

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
  const [realty, setRealty] = useState([]);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(API_URL + "/" + "realty", {
        headers: new Headers({
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }),
      }),
      fetch(API_URL + "/" + "user" + "/" + "protected" + "/" + "user-list", {
        headers: new Headers({
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }),
      }),
    ])
      .then((res) => res.map((item) => item.json()))
      .then(async (result) => {
        const agents = await result[1];
        const realty = await result[0];

        const resultRealty = realty.map((item) => {
          if (item["agent_id"]) {
            const agentOwner = agents.find(
              (agent) => agent.id == item.agent_id
            );
            if (agentOwner) {
              item["agent_id"] = `${agentOwner?.name}, ${agentOwner?.phone}`;
            }
          }
          return item;
        });
        setRealty(resultRealty);
      })
      .finally(() => setLoading(false));
  }, []);

  const realtyF = useMemo(() => {
    console.log("realty???", realty);
    let realtyFiltered = realty?.length ? [...realty] : [];
    if (formData?.category_id && formData?.category_id !== "null") {
      try {
        let category;
        if (formData?.category_id === null) {
          category = [];
        } else if (Array.isArray(formData?.category_id)) {
          category = formData?.category_id?.map((el) => el.toString());
        } else {
          category = formData?.category_id
            ?.split(",")
            ?.map((el) => el.toString());
        }
        console.log("category????", category);
        if (category?.length) {
          realtyFiltered = realtyFiltered.filter((r) => {
            if (category.includes(r?.category_id?.toString())) {
              return true;
            }
            return false;
          });
        }
        console.log("realtyFiltered 2", realtyFiltered);
      } catch (e) {
        console.log("e", e);
      }
    }

    if (formData?.state_id && formData?.state_id !== "null") {
      console.log("formData?.state_id ??", formData?.state_id);
      try {
        let state;
        if (formData?.state_id === null) {
          state = [];
        } else if (Array.isArray(formData?.state_id)) {
          state = formData?.state_id?.map((el) => el.toString());
        } else {
          state = formData?.state_id?.split(",")?.map((el) => el.toString());
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
    console.log("realtyFiltered000", realtyFiltered, formData?.district_id);
    if (formData?.district_id && formData?.district_id !== "null") {
      try {
        let district;
        if (formData?.district_id === null) {
          district = [];
        } else if (Array.isArray(formData?.district_id)) {
          district = formData?.district_id?.map((el) => el.toString());
        } else {
          district = formData?.district_id
            ?.split(",")
            ?.map((el) => el.toString());
        }
        district = district?.filter(Boolean);
        if (district?.length) {
          console.log("district??", district);
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
    console.log(
      "realtyFiltered111",
      realtyFiltered,
      formData?.apartment_complex_id
    );
    if (
      formData?.apartment_complex_id &&
      formData?.apartment_complex_id !== "null"
    ) {
      try {
        let apartment_complex;
        if (formData?.apartment_complex_id === null) {
          apartment_complex = [];
        } else if (
          Array.isArray(formData?.apartment_complex_id) &&
          formData?.apartment_complex_id?.length
        ) {
          apartment_complex = formData?.apartment_complex_id?.map((el) =>
            el.toString()
          );
        } else {
          apartment_complex = formData?.apartment_complex_id
            ?.split(",")
            ?.map((el) => el.toString());
        }
        apartment_complex = apartment_complex?.filter(Boolean);
        if (apartment_complex?.length) {
          realtyFiltered = realtyFiltered.filter((realty) => {
            if (apartment_complex.includes(realty?.state_id?.toString())) {
              return true;
            }
            return false;
          });
        }
      } catch (e) {
        console.log("e", e);
      }
    }
    console.log("realtyFiltered3", realtyFiltered);
    if (formData?.price && formData?.price !== "null") {
      try {
        const priceArr = formData?.price?.split("-");
        let priceMin = priceArr[0];
        let priceMax = priceArr[1];
        console.log("priceMin", priceMin);
        console.log("priceMax", priceMax);
        if (priceMin) {
          realtyFiltered = realtyFiltered.filter((realty) => {
            if (realty?.price >= priceMin) {
              return true;
            }
            return false;
          });
        }
        if (priceMax) {
          realtyFiltered = realtyFiltered.filter((realty) => {
            if (realty?.price <= priceMax) {
              return true;
            }
            return false;
          });
        }
      } catch (e) {}
    }

    return realtyFiltered;
  }, [formData, realty]);

  return (
    <>
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
                multiple
                labelTop={"Категория"}
                value={formData?.category_id?.toString()?.split(",") || []}
                data={category}
                onChange={(e, a) => {
                  setFormData((prev) => {
                    const prevarr =
                      formData?.category_id
                        ?.toString()
                        ?.split(",")
                        ?.map((e) => e.toString()) || [];
                    let res;
                    let cov = a.props.value.toString();
                    if (prevarr?.includes(cov)) {
                      res = prevarr.filter((q) => q != cov);
                    } else {
                      res = prevarr.concat(cov);
                    }
                    return {
                      ...prev,
                      category_id: res.toString(),
                    };
                  });
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Input
                isEditMode={isEditMode}
                fullWidth
                labelTop={"Бюджет в формате 10000-30000"}
                value={formData?.price}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, price: e.target.value }))
                }
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                isEditMode={isEditMode}
                fullWidth
                labelTop={"Состояние недвижимости"}
                multiple
                value={formData?.state_id?.toString()?.split(",") || []}
                data={state}
                onChange={(e, a) => {
                  setFormData((prev) => {
                    const prevarr =
                      formData?.state_id
                        ?.toString()
                        ?.split(",")
                        ?.map((e) => e.toString()) || [];
                    let res;
                    let cov = a.props.value.toString();
                    if (prevarr?.includes(cov)) {
                      res = prevarr.filter((q) => q != cov);
                    } else {
                      res = prevarr.concat(cov);
                    }
                    return {
                      ...prev,
                      state_id: res.toString(),
                    };
                  });
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Select
                isEditMode={isEditMode}
                fullWidth
                labelTop={"Район недвижимости"}
                multiple
                value={formData?.district_id?.toString()?.split(",") || []}
                data={district}
                onChange={(e, a) => {
                  setFormData((prev) => {
                    const prevarr =
                      formData?.district_id
                        ?.toString()
                        ?.split(",")
                        ?.map((e) => e.toString()) || [];
                    let res;
                    let cov = a.props.value.toString();
                    if (prevarr?.includes(cov)) {
                      res = prevarr.filter((q) => q != cov);
                    } else {
                      res = prevarr.concat(cov);
                    }
                    return {
                      ...prev,
                      district_id: res.toString(),
                    };
                  });
                }}
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
      {ownerId && <RecommendRealty realty={realtyF} loading={loading} />}
    </>
  );
};
