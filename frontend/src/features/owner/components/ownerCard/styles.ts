import { Box, styled, Typography } from "@mui/material";

export const OnwerCard = styled(Box)<{ ownerId?: string }>`
  padding: 30px 20px;
  border-radius: 6px;
  background: ${({ ownerId }) => (ownerId ? "#fff" : "transparent")};
  min-width: 300px;
  min-height: 230px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-content: flex-start;
`;

export const OwnerName = styled(Typography)`
  color: #222;
  font-family: Roboto, sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 26px;
`;

export const SocialBlock = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 10px;
  margin-top: 15px;
`;

export const SimpleText = styled(Typography)`
  color: #222;
  font-family: Roboto, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 23.1px;
`;
