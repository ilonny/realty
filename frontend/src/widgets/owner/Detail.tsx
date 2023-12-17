import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DetailWrapper } from "../../shared/components/detailWrapper";
import { DetailForm } from "../../features/owner/components/detailForm";
import { API_URL } from "../../constants/globalApi.constants";
import { TOwnerData } from "../../features/owner/shared/types";
import { useStateContext } from "../../containers/stateContext";
import { RecommendRealty } from "../../features/owner/components/recommendRealty";

const initialOwner: TOwnerData = {
  id: null,
  name: null,
  phone: null,
  email: null,
  agent_id: null,
  category_id: [],
  price: null,
  state_id: null,
  district_id: [],
  apartment_complex_id: [],
};

export const Detail = () => {
  const { handleSnackbar } = useStateContext();

  const { ownerId } = useParams();

  const [ownerData, setOwnerData] = useState<TOwnerData>(initialOwner);
  const [formData, setFormData] = useState<TOwnerData>(initialOwner);
  const [isEditMode, setEditMode] = useState(!ownerId);
  const [validErrors, setValidErrors] = useState<{
    phone?: string;
    name?: string;
  }>({});

  const navigate = useNavigate();

  useEffect(() => {
    if (ownerId) {
      fetch(API_URL + "/" + "owner" + "/" + "get-one?id=" + ownerId, {
        headers: new Headers({
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          setOwnerData({
            ...res,
            district_id: res.district_id.split(","),
            apartment_complex_id: res.apartment_complex_id.split(","),
          });
        });
    }
  }, [ownerId]);

  useEffect(() => {
    if (ownerId && Object.keys(ownerData).length) {
      setFormData(ownerData);
    }
  }, [ownerData, ownerId]);

  const handleEditMode = useCallback(() => setEditMode((prev) => !prev), []);

  const handleSave = useCallback(() => {
    if (!formData?.name || !formData?.phone) {
      if (!formData?.name) {
        setValidErrors((prev) => ({
          ...prev,
          name: "Обязательно для заполнения",
        }));
      } else if (validErrors?.name && formData?.name) {
        setValidErrors((prev) => ({ ...prev, name: undefined }));
      }
      if (!formData?.phone) {
        setValidErrors((prev) => ({
          ...prev,
          phone: "Обязательно для заполнения",
        }));
      } else if (validErrors?.phone && formData?.phone) {
        setValidErrors((prev) => ({ ...prev, phone: undefined }));
      }
      return;
    }
    if (ownerId) {
      const data = new FormData();
      Object.entries(formData).forEach((arr) => data.append(arr[0], arr[1]));

      fetch(API_URL + "/" + "owner" + "/" + "update", {
        method: "POST",
        body: data,
        headers: new Headers({
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }),
      })
        .then((res) => res.json())
        .then(({ message }) => {
          navigate("/owner");
          handleSnackbar({ open: true, message });
        })
        .catch(({ message }) => handleSnackbar({ open: true, message }));
    } else {
      const data = new FormData();
      Object.entries(formData).forEach(
        (arr) => arr?.[0] !== "id" && data.append(arr[0], arr[1])
      );

      fetch(API_URL + "/" + "owner" + "/" + "create", {
        method: "POST",
        body: data,
        headers: new Headers({
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }),
      })
        .then((res) => res.json())
        .then(({ message }) => {
          navigate("/owner");
          handleSnackbar({ open: true, message });
        })
        .catch(({ message }) => handleSnackbar({ open: true, message }));
    }
  }, [ownerId, formData, formData?.name, formData?.phone]);

  const handleDelete = useCallback(() => {
    const data = new FormData();
    data.append("id", ownerId);
    fetch(API_URL + "/" + "owner" + "/" + "delete", {
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
        navigate("/owner");
      })
      .catch(({ message }) => handleSnackbar({ open: true, message }));
  }, [ownerId]);

  return (
    <DetailWrapper
      title={"о клиенте"}
      isEditMode={isEditMode}
      onEditMode={handleEditMode}
      onSave={handleSave}
      onDelete={handleDelete}
    >
      <DetailForm
        validErrors={validErrors}
        ownerId={ownerId}
        isEditMode={isEditMode}
        data={ownerData}
        formData={formData}
        setFormData={setFormData}
      />
      {ownerId && <RecommendRealty />}
    </DetailWrapper>
  );
};
