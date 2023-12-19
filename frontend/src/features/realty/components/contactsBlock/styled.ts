import { styled, Typography } from "@mui/material";

export const SubText = styled(Typography)`
  color: var(--text-secondary, #9e9e9e);
  font-feature-settings: "clig" off, "liga" off;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.15px;
`;

export const AgentText = styled(Typography)`
  color: #000;
  font-feature-settings: "clig" off, "liga" off;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0.15px;
`;

export const OwnerText = styled(Typography)`
  color: var(--text-primary, var(--text-primary, rgba(0, 0, 0, 0.87)));
  font-feature-settings: "clig" off, "liga" off;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.15px;
`;
