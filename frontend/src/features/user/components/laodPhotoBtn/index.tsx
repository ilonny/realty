import { Box, Button, ListItemIcon, Menu, Typography } from "@mui/material";
import PhotoIcon from "../../../../assets/icons/photoIcon.svg";
import LoadPhotoIcon from "../../../../assets/icons/loadPhotoIcon.svg";
import DeletePhotoIcon from "../../../../assets/icons/deletePhotoIcon.svg";
import MenuItem from "@mui/material/MenuItem";
import { DeleteText, LoadText } from "./styles";

export const LoadPhotoBtn = ({
  handleClick,
  anchorEl,
  handleClose,
  onLoad,
  onDelete,
  open,
  noPhoto = false,
}) => {
  return (
    <Box
      sx={{
        position: noPhoto ? "static" : "absolute",
        bottom: "20px",
        right: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {noPhoto && <Typography>Добавить фото</Typography>}
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <img src={PhotoIcon} alt="photo" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{
          style: {
            left: "50%",
            transform: "translateX(-90%) translateY(-10px)",
          },
        }}
      >
        <label>
          <MenuItem>
            {" "}
            <ListItemIcon>
              <img src={LoadPhotoIcon} />
            </ListItemIcon>
            <LoadText>Загрузить фото</LoadText>
            <input
              type="file"
              id="fileinput"
              hidden
              onChange={(e) => {
                onLoad(e.target.files[0]);
              }}
            />
          </MenuItem>
        </label>
        {/* <MenuItem onClick={onDelete}>
          <ListItemIcon>
            <img src={DeletePhotoIcon} />
          </ListItemIcon>
          <DeleteText>Удалить фото</DeleteText>
        </MenuItem> */}
      </Menu>
    </Box>
  );
  return;
};
