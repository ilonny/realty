import { CustomInput, Label, CustomSelect } from "./styles";
import MenuItem from "@mui/material/MenuItem";
import { Box, Chip, Typography } from "@mui/material";

export const Input = (props) => {
  const { labelTop, isEditMode, noLabel } = props;
  return (
    <>
      <Label>
        {noLabel ? "" : labelTop}
        {isEditMode ? (
          <CustomInput
            variant={"standard"}
            {...props}
            InputProps={{
              disableUnderline: true,
            }}
          />
        ) : (
          <Box sx={{ minHeight: "54px" }}>
            <Typography>{props.value}</Typography>
          </Box>
        )}
      </Label>
    </>
  );
};

export const Select = ({
  value,
  onChange,
  data,
  labelTop,
  isEditMode,
  ...props
}) => {
  const values = [];

  if (Array.isArray(value)) {
    value.forEach((item) => {
      const currentName = data.find(({ id }) => id == item);
      values.push(currentName?.name);
    });
  }

  return (
    <>
      <Label>
        {labelTop}
        {isEditMode ? (
          <CustomSelect
            value={value}
            onChange={onChange}
            multiple={props.multiple}
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                border: 0,
              },
              "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  border: "none",
                },
            }}
            renderValue={(selected) => {
              if (Array.isArray(selected)) {
                const selectedName = [];
                selected.forEach((item) => {
                  const currentName = data.find(({ id }) => id == item);
                  if (currentName) {
                    selectedName.push(
                      (currentName?.surname ? currentName?.surname : "") +
                        currentName?.name
                    );
                  }
                });
                return (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selectedName?.length
                      ? selectedName.map((value) => (
                          <Chip key={value} label={value} />
                        ))
                      : null}
                  </Box>
                );
              }
              return data?.find(({ id }) => id == selected)?.name;
            }}
            {...props}
          >
            {data.map(({ id, name }) => (
              <MenuItem value={id}>{name}</MenuItem>
            ))}
          </CustomSelect>
        ) : (
          <Box sx={{ minHeight: "54px" }}>
            <Typography>
              {Array.isArray(value)
                ? values.join(", ")
                : data?.find(({ id }) => id == value)?.name}
            </Typography>
          </Box>
        )}
      </Label>
    </>
  );
};
