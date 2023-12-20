import { Dispatch, FC, SetStateAction } from "react";
import { TUserData } from "../../shared/types";
import { UserCard } from "../userCard";
import { Error, FormDataBlock, FormWrapper, Label, TextArea } from "./styled";
import { Box, Grid, Typography } from "@mui/material";
import { Input } from "../../../../shared/components/input";

interface IDetailFormProps {
  data: TUserData;
  formData: TUserData;
  setFormData: Dispatch<SetStateAction<TUserData>>;
  isEditMode: boolean;
  userId: string;
  validErrors: {
    login?: string;
    password?: string;
    surname?: string;
    name?: string;
  };
}

export const DetailForm: FC<IDetailFormProps> = ({
  data,
  formData,
  setFormData,
  isEditMode = { isEditMode },
  userId,
  validErrors,
}) => {
  return (
    <FormWrapper>
      <UserCard
        data={data}
        formData={formData}
        userId={userId}
        onChoosePhoto={(photo) => {
          console.log("onChoosePhoto photo: ", photo);
          setFormData((prev) => ({ ...prev, photo }));
        }}
      />
      <FormDataBlock>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Input
              error={validErrors?.login}
              isEditMode={isEditMode}
              fullWidth
              labelTop={"Логин*"}
              value={formData?.login}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, login: e.target.value }))
              }
            />
            {isEditMode && validErrors?.login && (
              <Error>{validErrors?.login}</Error>
            )}
          </Grid>
          <Grid item xs={6}>
            <Input
              error={validErrors?.password}
              isEditMode={isEditMode}
              fullWidth
              labelTop={"Пароль*"}
              value={formData?.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
            {isEditMode && validErrors?.password && (
              <Error>{validErrors?.password}</Error>
            )}
          </Grid>
          <Grid item xs={6}>
            <Input
              error={validErrors?.name}
              isEditMode={isEditMode}
              fullWidth
              labelTop={"Имя*"}
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
              error={validErrors?.surname}
              isEditMode={isEditMode}
              fullWidth
              labelTop={"Фамилия*"}
              value={formData?.surname}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, surname: e.target.value }))
              }
            />
            {isEditMode && validErrors?.surname && (
              <Error>{validErrors?.surname}</Error>
            )}
          </Grid>
          {/* <Grid item xs={6}>
            <Input
              isEditMode={isEditMode}
              fullWidth
              labelTop={"Отчество"}
              value={formData?.thirdname}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, thirdname: e.target.value }))
              }
            />
          </Grid>
          <Grid item xs={6}></Grid> */}
          <Grid item xs={6}>
            <Input
              isEditMode={isEditMode}
              fullWidth
              labelTop={"Телефон"}
              value={formData?.phone}
              onChange={(e) =>
                setFormData((prev) =>
                  /\d+/.test(Number(e.target.value))
                    ? { ...prev, phone: e.target.value }
                    : prev
                )
              }
            />
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
          <Grid item xs={12}>
            <Label>
              Описание{" "}
              {isEditMode ? (
                <TextArea
                  rows={4}
                  value={formData?.other}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, other: e.target.value }))
                  }
                />
              ) : (
                <Box sx={{ minHeight: "54px" }}>
                  <Typography>{formData?.other}</Typography>
                </Box>
              )}
            </Label>
          </Grid>
        </Grid>
      </FormDataBlock>
    </FormWrapper>
  );
};
