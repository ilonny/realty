import { AgentText, OwnerText, SubText } from "./styled";
import { FC, ReactNode } from "react";
import { Box, Divider, Stack } from "@mui/material";

interface IContactsProps {
  [key: string]: string;
}

export const ContactsBlock: FC<IContactsProps> = ({ owner, agent }) => (
  <Stack direction={"column"} alignItems={"flex-start"}>
    <Stack direction={"column"} alignItems={"flex-start"}>
      <SubText>Агент</SubText>
      <AgentText>{agent}</AgentText>
    </Stack>
    <Divider sx={{ margin: "10px 0", width: "100%" }} />
    <Stack direction={"column"} alignItems={"flex-start"}>
      <SubText>Собственник</SubText>
      <OwnerText>{owner}</OwnerText>
    </Stack>
  </Stack>
);
