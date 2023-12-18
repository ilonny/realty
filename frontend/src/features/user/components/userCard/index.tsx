import { FC, MouseEvent, useCallback, useState } from "react";
import PhotoIcon from "../../../../assets/icons/photoIcon.svg";
import PhoneIcon from "../../../../assets/icons/phoneIcon.svg";
import EmailIcon from "../../../../assets/icons/emailIcon.svg";
import { TUserData } from "../../shared/types";
import { UserCardWrapper, UserName, SocialBlock, SimpleText } from "./styles";
import { Box, Button, ListItemIcon, ListItemText, Menu } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { LoadPhotoBtn } from "../laodPhotoBtn";

interface TUserCard {
  data: TUserData;
  userId: string;
  onChoosePhoto: any;
  formData: any;
}

export const UserCard: FC<TUserCard> = ({
  data,
  userId,
  onChoosePhoto,
  formData,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <UserCardWrapper userId={userId}>
      {userId && (
        <>
          {data?.photo ? (
            <Box
              sx={{
                margin: "20px 0",
                maxWidth: "372px",
                maxHeight: "372px",
                position: "relative",
              }}
            >
              {formData?.photo?.size ? (
                <img
                  src={URL.createObjectURL(formData?.photo)}
                  alt={"photo"}
                  width={"100%"}
                />
              ) : (
                <img
                  src={`https://neverhaveiever.ru/${data?.photo}`}
                  alt={"photo"}
                  width={"100%"}
                />
              )}
              <LoadPhotoBtn
                open={open}
                handleClick={handleClick}
                handleClose={handleClose}
                anchorEl={anchorEl}
                onLoad={onChoosePhoto}
                onDelete={console.log}
              />
            </Box>
          ) : (
            <Box
              sx={{
                margin: "20px auto",
                maxWidth: "372px",
                maxHeight: "372px",
                position: "relative",
              }}
            >
              <LoadPhotoBtn
                open={open}
                handleClick={handleClick}
                handleClose={handleClose}
                anchorEl={anchorEl}
                onLoad={onChoosePhoto}
                onDelete={console.log}
              />
            </Box>
          )}
          <UserName>{data?.name}</UserName>
          <SocialBlock>
            <img src={PhoneIcon} alt={"phone"} />
            <SimpleText>{data?.phone}</SimpleText>
          </SocialBlock>
          <SocialBlock>
            <img src={EmailIcon} alt={"phone"} />
            <SimpleText>{data?.email}</SimpleText>
          </SocialBlock>
          <Box mt={1.5}>
            <UserName>Описание</UserName>
          </Box>
          <SocialBlock>
            <SimpleText>{data?.other}</SimpleText>
          </SocialBlock>
        </>
      )}
      {!userId && (
        <Box
          sx={{
            margin: "20px auto",
            maxWidth: "372px",
            maxHeight: "372px",
            minWidth: "372px",
            minHeight: "372px",
            position: "relative",
          }}
        >
          {formData?.photo?.size ? (
            <img
              src={URL.createObjectURL(formData?.photo)}
              alt={"photo"}
              width={"100%"}
            />
          ) : (
            <img
              src={`https://neverhaveiever.ru/${data?.photo}`}
              alt={"photo"}
              width={"100%"}
            />
          )}
          <LoadPhotoBtn
            open={open}
            handleClick={handleClick}
            handleClose={handleClose}
            anchorEl={anchorEl}
            onLoad={onChoosePhoto}
            onDelete={console.log}
          />
        </Box>
      )}
    </UserCardWrapper>
  );
};
