import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DetailWrapper } from "../../shared/components/detailWrapper";
import { DetailForm } from "../../features/realty/components/DetailForm";
import { API_URL } from "../../constants/globalApi.constants";
import { useStateContext } from "../../containers/stateContext";
import { getFormDataFromParams } from "./helpers";

const initialRealty: any = {};

export const Detail = () => {
  const { handleSnackbar } = useStateContext();

  const { realtyId } = useParams();

  const [realtyData, setRealtyData] = useState<any>(initialRealty);
  const [formData, setFormData] = useState<any>(initialRealty);
  const [isEditMode, setEditMode] = useState(!realtyId);
  const [validErrors, setValidErrors] = useState<{
    phone?: string;
    name?: string;
  }>({});

  const navigate = useNavigate();

  useEffect(() => {
    if (realtyId) {
      fetch(API_URL + "/" + "realty" + "/" + "get-one?id=" + realtyId, {
        headers: new Headers({
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log("res?", res);
          setRealtyData({
            ...res,
            district_id: res.district_id?.split(",") || "",
            apartment_complex_id: res.apartment_complex_id?.split(",") || "",
          });
        });
    }
  }, [realtyId]);

  useEffect(() => {
    if (realtyId && Object.keys(realtyData).length) {
      setFormData(realtyData);
    }
  }, [realtyData, realtyId]);

  const handleEditMode = useCallback(() => setEditMode((prev) => !prev), []);

  useEffect(() => {
    const data = getFormDataFromParams(formData);
    console.log("data.getName", data.get("name"));
    console.log("data.getPhotos", data.getAll("photos"));
  }, [formData]);

  const handleSave = useCallback(() => {
    if (realtyId) {
      const data = getFormDataFromParams(formData);

      fetch(API_URL + "/" + "realty" + "/" + "update", {
        method: "POST",
        body: data,
        headers: new Headers({
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }),
      })
        .then((res) => res.json())
        .then(({ message }) => {
          navigate("/realty");
          handleSnackbar({ open: true, message });
        })
        .catch(({ message }) => handleSnackbar({ open: true, message }));
    } else {
      // const data = new FormData();
      // Object.entries(formData).forEach(
      //   (arr) => arr?.[0] !== "id" && data.append(arr[0], arr[1])
      // );
      const data = getFormDataFromParams(formData);

      fetch(API_URL + "/" + "realty" + "/" + "create", {
        method: "POST",
        body: data,
        headers: new Headers({
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }),
      })
        .then((res) => res.json())
        .then(({ message }) => {
          navigate("/realty");
          handleSnackbar({ open: true, message });
        })
        .catch(({ message }) => handleSnackbar({ open: true, message }));
    }
  }, [realtyId, formData, formData?.name, formData?.phone]);

  const handleDelete = useCallback(() => {
    const data = new FormData();
    data.append("id", realtyId);
    fetch(API_URL + "/" + "realty" + "/" + "delete", {
      method: "POST",
      body: data,
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
    })
      .then((res) => res.json())
      .then(({ message }) => {
        console.log(message);
        handleSnackbar({ open: true, message });
        navigate("/realty");
      })
      .catch(({ message }) => handleSnackbar({ open: true, message }));
  }, [realtyId]);

  console.log("realtyData", realtyData);

  return (
    <DetailWrapper
      title={"о недвижимости"}
      isEditMode={isEditMode}
      onEditMode={handleEditMode}
      onSave={handleSave}
      onDelete={handleDelete}
    >
      <DetailForm
        validErrors={validErrors}
        realtyId={realtyId}
        isEditMode={isEditMode}
        data={realtyData}
        formData={formData}
        setFormData={setFormData}
      />
    </DetailWrapper>
  );
};
