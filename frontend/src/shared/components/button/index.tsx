import { FC } from "react";
import { CustomContainedButton, CustomOutlinedButton } from "./styled";

interface UIButtonProps {
  children: string;

  [p: string]: any;
}

export const UIContainedButton: FC<UIButtonProps> = ({
  children,
  ...props
}) => {
  return (
    <CustomContainedButton variant={"contained"} {...props}>
      {children}
    </CustomContainedButton>
  );
};

export const UIOutlinedButton: FC<UIButtonProps> = ({ children, ...props }) => {
  return (
    <CustomOutlinedButton variant={"outlined"} {...props}>
      {children}
    </CustomOutlinedButton>
  );
};
