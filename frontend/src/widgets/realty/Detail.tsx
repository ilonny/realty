import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { DetailWrapper } from "../../shared/components/detailWrapper";
import { DetailForm } from "../../features/realty/components/DetailForm";
import { API_URL } from "../../constants/globalApi.constants";
import { useStateContext } from "../../containers/stateContext";
import { getFormDataFromParams } from "./helpers";
import authProvider from "../../authProvider";

const initialRealty: any = {};

export const Detail = () => {
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    authProvider.getIdentity().then((user) => {
      setCurrentUser(user);
      if (user.role != "admin") {
        setFormData((prev) => ({ ...prev, agent_id: user.id }));
      }
    });
  }, []);
  const { handleSnackbar } = useStateContext();
  const { state } = useLocation();

  const { realtyId } = useParams();

  const [realtyData, setRealtyData] = useState<any>(initialRealty);
  const [formData, setFormData] = useState<any>(initialRealty);
  const [isEditMode, setEditMode] = useState(state?.isEditable ?? !realtyId);
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
          setRealtyData({
            ...res,
            // district_id: res?.district_id?.split(",") || "",
            // apartment_complex_id: res?.apartment_complex_id?.split(",") || "",
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
  }, [formData]);

  const handleSave = useCallback(() => {
    if (!formData?.category_id) {
      setValidErrors((prev) => ({
        ...prev,
        category_id: "Обязательно для заполнения",
      }));
      return;
    } else if (validErrors?.category_id && formData?.category_id) {
      setValidErrors((prev) => ({ ...prev, category_id: undefined }));
    }
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
        handleSnackbar({ open: true, message });
        navigate("/realty");
      })
      .catch(({ message }) => handleSnackbar({ open: true, message }));
  }, [realtyId]);

  useEffect(() => {
    if (state?.isEditable) {
      setEditMode(false);
      setTimeout(() => {
        setEditMode(true);
      }, 500);
    }
  }, [state?.isEditable]);

  return (
    <DetailWrapper
      title={"о недвижимости"}
      isEditMode={isEditMode}
      onEditMode={handleEditMode}
      onSave={handleSave}
      onDelete={handleDelete}
      canEdit={
        currentUser?.id == formData?.agent_id ||
        currentUser?.role === "admin" ||
        !realtyId
      }
    >
      <DetailForm
        validErrors={validErrors}
        realtyId={realtyId}
        isEditMode={isEditMode}
        data={realtyData}
        formData={formData}
        setFormData={setFormData}
        setEditMode={setEditMode}
      />
    </DetailWrapper>
  );
};
