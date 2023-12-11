import { Box, Button, styled } from "@mui/material";

export const HeaderWrapper = styled(Box)`
  width: 100%;
`;

export const Container = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 109px;
  padding: 0 20px;
`;

export const Logo = styled("img")`
  width: 180px;
  height: 70px;
`;

export const ProfileBlock = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 25px;
`;
export const LoginButton = styled(Button)`
  color: #dc371e;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  text-transform: none;
`;
export const ProfileButton = styled(Button)`
  min-width: auto;
  padding: 8px 16px;
  color: #dc371e;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  text-transform: none;
  border-radius: 4px;
  border: 1px solid #dc371e;
  background: #fff;
  gap: 8px;
`;
