import { styled, Typography } from "@mui/material";

export const AboutTextWrapper = styled(Typography)`
  color: #000;
  font-feature-settings: "clig" off, "liga" off;
  font-family: Roboto, sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 27px;
  margin-bottom: 8px;
`;

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

export const ConditionText = styled(Typography)`
  display: flex;
  padding: 4px 10px;
  align-items: center;
  border-radius: 100px;
  background: #fed7d7;
  color: #dc371e;
  font-feature-settings: "clig" off, "liga" off;
  font-family: Roboto, sans-serif;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  letter-spacing: 0.16px;
`;
