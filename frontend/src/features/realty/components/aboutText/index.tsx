import { AboutTextWrapper, ConditionText, SubText } from "./styled";
import { FC, ReactNode } from "react";
import { Stack } from "@mui/material";

interface IAboutTextProps {
  [key: string]: string;

  children: ReactNode;
}

export const AboutText: FC<IAboutTextProps> = ({
  id,
  district,
  conditions,
  children,
}) => (
  <Stack direction={"column"} alignItems={"flex-start"}>
    <SubText>ID {id}</SubText>
    <AboutTextWrapper>{children}</AboutTextWrapper>
    <SubText mb={"10px"}>{district}</SubText>
    {conditions && <ConditionText>{conditions}</ConditionText>}
  </Stack>
);
