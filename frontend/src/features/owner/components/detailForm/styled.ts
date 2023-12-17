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
