import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DetailWrapper } from "../../shared/components/detailWrapper";
import { DetailForm } from "../../features/user/components/detailForm";
import { API_URL } from "../../constants/globalApi.constants";
import { TUserData } from "../../features/user/shared/types";
import { useStateContext } from "../../containers/stateContext";
import { RecommendRealty } from "../../features/user/components/recommendRealty";

const initialUser: TUserData = {
  id: null,
  login: null,
  password: null,
  email: null,
  role: null,
  other: null,
  deleted: null,
  name: null,
  surname: null,
  thirdname: null,
  phone: null,
  photo: null,
  access_token: null,
};

export const Detail = () => {
  const { handleSnackbar } = useStateContext();

  const { userId } = useParams();

  const [userData, setUserData] = useState<TUserData>(initialUser);
  const [formData, setFormData] = useState<TUserData>(initialUser);
  const [isEditMode, setEditMode] = useState(!userId);
  const [validErrors, setValidErrors] = useState<{
    password?: string;
    surname?: string;
    name?: string;
    login?: string;
  }>({});

  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      fetch(
        API_URL + "/" + "user" + "/" + "protected" + "/" + "user?id=" + userId,
        {
          headers: new Headers({
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }),
        }
      )
        .then((res) => res.json())
        .then((res) => {
          setUserData({
            ...res,
          });
        });
    }
  }, [userId]);

  useEffect(() => {
    if (userId && Object.keys(userData).length) {
      setFormData(userData);
    }
  }, [userData, userId]);

  const handleEditMode = useCallback(() => setEditMode((prev) => !prev), []);

  const handleSave = useCallback(() => {
    if (
      !formData?.name ||
      !formData?.surname ||
      !formData?.password ||
      !formData?.login
    ) {
      if (!formData?.name) {
        setValidErrors((prev) => ({
          ...prev,
          name: "Обязательно для заполнения",
        }));
      } else if (validErrors?.name && formData?.name) {
        setValidErrors((prev) => ({ ...prev, name: undefined }));
      }
      if (!formData?.surname) {
        setValidErrors((prev) => ({
          ...prev,
          surname: "Обязательно для заполнения",
        }));
      } else if (validErrors?.surname && formData?.surname) {
        setValidErrors((prev) => ({ ...prev, surname: undefined }));
      }
      if (!formData?.password) {
        setValidErrors((prev) => ({
          ...prev,
          password: "Обязательно для заполнения",
        }));
      } else if (validErrors?.password && formData?.password) {
        setValidErrors((prev) => ({ ...prev, password: undefined }));
      }
      if (!formData?.login) {
        setValidErrors((prev) => ({
          ...prev,
          login: "Обязательно для заполнения",
        }));
      } else if (validErrors?.login && formData?.login) {
        setValidErrors((prev) => ({ ...prev, login: undefined }));
      }
      return;
    }
    if (userId) {
      const data = new FormData();
      Object.entries(formData).forEach((arr) => data.append(arr[0], arr[1]));

      fetch(API_URL + "/user/protected/" + "user-update", {
        method: "POST",
        body: data,
        headers: new Headers({
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }),
      })
        .then((res) => res.json())
        .then(({ message }) => {
          navigate("/user");
          handleSnackbar({ open: true, message });
        })
        .catch(({ message }) => handleSnackbar({ open: true, message }));
    } else {
      const data = new FormData();
      Object.entries(formData).forEach(
        (arr) => arr?.[0] !== "id" && data.append(arr[0], arr[1])
      );

      fetch(API_URL + "/user/protected/" + "user-create", {
        method: "POST",
        body: data,
        headers: new Headers({
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }),
      })
        .then((res) => res.json())
        .then(({ message }) => {
          navigate("/user");
          handleSnackbar({ open: true, message });
        })
        .catch(({ message }) => handleSnackbar({ open: true, message }));
    }
  }, [userId, formData, formData?.name, formData?.phone]);

  const handleDelete = useCallback(() => {
    const data = new FormData();
    data.append("id", userId);
    fetch(API_URL + "/user/protected/" + "user-delete", {
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
        navigate("/user");
      })
      .catch(({ message }) => handleSnackbar({ open: true, message }));
  }, [userId]);

  return (
    <DetailWrapper
      title={"об агенте"}
      isEditMode={isEditMode}
      onEditMode={handleEditMode}
      onSave={handleSave}
      onDelete={handleDelete}
    >
      <DetailForm
        validErrors={validErrors}
        userId={userId}
        isEditMode={isEditMode}
        data={userData}
        formData={formData}
        setFormData={setFormData}
      />
    </DetailWrapper>
  );
};
