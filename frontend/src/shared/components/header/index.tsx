import ProfileLogo from "../../../assets/icons/profile.svg";
import LogoIcon from "../../../assets/icons/logo.svg";
import {
  Container,
  HeaderWrapper,
  LoginButton,
  ProfileBlock,
  ProfileButton,
  Logo,
} from "./styled";
import { NavigationTab } from "../navigation";
import { Link } from "react-admin";
import { redirect } from "react-router-dom";

export const Header = () => (
  <HeaderWrapper>
    <Container>
      <Link to={"/realty"}>
        <Logo src={LogoIcon} alt={"logo"} />
      </Link>
      <ProfileBlock>
        {/* <LoginButton variant="text">Вход</LoginButton> */}
        <ProfileButton
          onClick={() => {
            localStorage.clear();
            window.location.replace("/");
          }}
        >
          Выход <img src={ProfileLogo} alt={"profile"} />
        </ProfileButton>
      </ProfileBlock>
    </Container>
    <NavigationTab />
  </HeaderWrapper>
);
