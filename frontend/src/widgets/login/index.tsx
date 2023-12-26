import {Box, styled} from "@mui/material";
import {LoginForm} from "../../features/login/components/form";

const LoginWrapper = styled(Box)`
  padding:0;
  margin:0;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  // width: 100vw;
  height: 100vh;
  background: radial-gradient(circle at 50% 14em, rgb(49, 50, 100) 0%, rgb(0, 2, 59) 60%, rgb(0, 2, 59) 100%);
`

export const LoginWidget = () => (
    <LoginWrapper>
        <LoginForm/>
    </LoginWrapper>
)
