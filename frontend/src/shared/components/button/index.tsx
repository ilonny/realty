import { FC } from "react";
import AddIcon from "@mui/icons-material/Add";
import { CustomButton } from "./styled";

interface UIButtonProps {
  children: string;
  [p: string]: any;
}

export const UIContainedButton: FC<UIButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <CustomButton variant={"contained"} {...props} startIcon={<AddIcon />}>
      {children}
    </CustomButton>
  );
};
