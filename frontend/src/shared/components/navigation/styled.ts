import { styled } from "@mui/material";
import { Link } from "react-router-dom";

export const NavigationWrapper = styled("nav")`
  padding: 0 20px;
  height: 60px;
`;

export const NavigationUl = styled("ul")`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
`;

export const Navigationli = styled("li")<{ isActive?: boolean }>`
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  list-style: none;
  border-top: 1px solid #f8f8f8;
  background: #fff;
  box-sizing: content-box;
  border-radius: var(--none, 0px);

  border-right: ${({ isActive }) =>
    isActive
      ? "var(--none, 0px) solid #DC371E"
      : "var(--none, 1px) solid #f8f8f8"};
  border-bottom: ${({ isActive }) =>
    isActive ? "2px solid #DC371E" : "var(--none, 1px) solid #f8f8f8"};
  border-left: ${({ isActive }) =>
    isActive
      ? "var(--none, 0px) solid #DC371E"
      : "var(--none, 1px) solid #f8f8f8"};

  & svg {
    color: transparent;
    background: transparent;
  }
`;

export const NavigationLink = styled(Link)<{ isActive?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: ${({ isActive }) => (isActive ? "#dc371e" : "#000")};
  text-align: center;
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  gap: 10px;

  & svg {
    color: transparent;
    background: transparent;
  }
  &:hover {
    background: #f2f2f2;
    & svg {
      color: #dc371e;
      background: transparent;
    }
  }
`;
