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

export const Header = () => (
  <HeaderWrapper>
    <Container>
      <a href={"/owner"}>
        <Logo src={LogoIcon} alt={"logo"} />
      </a>
      <ProfileBlock>
        <LoginButton variant="text">Вход</LoginButton>
        <ProfileButton>
          Профиль <img src={ProfileLogo} alt={"profile"} />
        </ProfileButton>
      </ProfileBlock>
    </Container>
    <NavigationTab />
  </HeaderWrapper>
);
