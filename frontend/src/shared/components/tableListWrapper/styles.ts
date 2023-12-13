import { Box, styled, Typography } from "@mui/material";

export const Block = styled(Box)`
  display: flex;
  width: 100%;
  height: 72px;
  padding: var(--2, 16px);
  justify-content: space-between;
  align-items: center;
  gap: var(--2, 16px);
  border-radius: var(--none, 0px);
  border-top: var(--none, 0px) solid #e0e0e0;
  border-right: var(--none, 0px) solid #e0e0e0;
  border-bottom: 1px solid #e0e0e0;
  border-left: var(--none, 0px) solid #e0e0e0;
  background: #fff;
`;

export const Title = styled(Typography)`
  color: var(--text-primary, rgba(0, 0, 0, 0.87));
  font-family: Roboto, sans-serif;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: 133.4%; /* 32.016px */
`;
