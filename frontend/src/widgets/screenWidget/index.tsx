import { Header } from "../../shared/components/header";
import { Footer } from "../../shared/components/footer";
import { styled } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";

const Wrapper = styled("div")`
  width: 100vw;
  height: 100vh;
  background: #f8f8f8;
`;

const Content = styled("div")`
  width: 100%;
  height: auto;
`;

export const ScreenWidget = () => {
  return (
    <Wrapper>
      <Header />
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </Wrapper>
  );
};
