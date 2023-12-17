import { Box, styled, Typography } from "@mui/material";

export const FormWrapper = styled(Box)`
  margin-top: 40px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: start;
  width: 100%;
  height: auto;
  gap: 80px;
`;

export const FormDataBlock = styled(Box)``;

export const Error = styled(Typography)`
  color: rgb(211, 47, 47);
  font-family: Roboto, Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 1.66;
  letter-spacing: 0.03333em;
  text-align: left;
`;

export const TextArea = styled("textarea")`
  padding: 16px;
  width: 100%;
  height: auto;
  border-radius: 6px;
  border: 1px solid #202020;
  background: #fff;
  color: #222;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-weight: 400;
`;

export const Label = styled("label")`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #222;
  font-feature-settings: "clig" off, "liga" off;
  font-family: Roboto, sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
`;
