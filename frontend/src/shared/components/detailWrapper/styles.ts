import { Box, styled, Typography } from "@mui/material";

export const Wrapper = styled(Box)`
  padding: 0 16px;
  width: 100%;
  height: auto;
`;

export const ActionBlock = styled(Box)`
  height: 92px;
  width: 100%;
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: var(--none, 0px);
  border-top: var(--none, 0px) solid #e0e0e0;
  border-right: var(--none, 0px) solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  border-left: var(--none, 0px) solid #e0e0e0;
  background: #fff;
`;

export const Title = styled(Typography)`
  color: #000;
  font-family: Roboto, sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 32px;
`;

export const ButtonsBlock = styled(Box)`
  display: flex;
  gap: 20px;
`;
