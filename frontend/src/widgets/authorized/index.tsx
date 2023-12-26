import { Header } from "../../shared/components/header";
import { Footer } from "../../shared/components/footer";
import { styled } from "@mui/material";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useToken } from "../../features/login/hooks/useToken";

const Wrapper = styled("div")`
  // width: 100vw;
  min-height: 100vh;
  height: auto;
  background: #f8f8f8;
`;

const Content = styled("div")`
  width: 100%;
  height: auto;
`;

export const Authorized = () => {
  const [token] = useToken();

  if (token === null) {
    return <Navigate replace to="/login" />;
  }

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
