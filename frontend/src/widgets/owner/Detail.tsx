import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DetailWrapper } from "../../shared/components/detailWrapper";
import { DetailForm } from "../../features/owner/components/detailForm";
import { API_URL } from "../../constants/globalApi.constants";
import { TOwnerData } from "../../features/owner/shared/types";
import { Snackbar, SnackbarOrigin } from "@mui/material";

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

interface State {
  open: boolean;
  message: string;
}

export const Detail = () => {
  const { ownerId } = useParams();

  const [ownerData, setOwnerData] = useState<TOwnerData>(initialOwner);
  const [formData, setFormData] = useState<TOwnerData>(initialOwner);
  const [isEditMode, setEditMode] = useState(ownerId ? false : true);

  const [state, setState] = useState<State>({
    open: false,
    message: "",
  });

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
  }, []);

  useEffect(() => {
    if (ownerId && Object.keys(ownerData).length) {
      setFormData(ownerData);
    }
  }, [ownerData]);

  const handleEditMode = useCallback(() => setEditMode((prev) => !prev), []);

  const handleSave = useCallback(() => {
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
          setState({ open: true, message });
        })
        .catch(({ message }) => setState({ open: true, message }));
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
          setState({ open: true, message });
        })
        .catch(({ message }) => setState({ open: true, message }));
    }
  }, [ownerId, formData]);

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
        setState({ open: true, message });
        navigate("/owner");
      })
      .catch(({ message }) => setState({ open: true, message }));
  }, []);

  return (
    <DetailWrapper
      title={"о клиенте"}
      isEditMode={isEditMode}
      onEditMode={handleEditMode}
      onSave={handleSave}
      onDelete={handleDelete}
    >
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={state.open}
        message={state.message}
      />
      <DetailForm
        ownerId={ownerId}
        isEditMode={isEditMode}
        data={ownerData}
        formData={formData}
        setFormData={setFormData}
      />
    </DetailWrapper>
  );
};
