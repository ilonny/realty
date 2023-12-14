import {
  Navigationli,
  NavigationLink,
  NavigationUl,
  NavigationWrapper,
} from "./styled";
import { tabNavigation } from "../../../constants/app.constants";
import { useLocation } from "react-router-dom";

export const NavigationTab = () => {
  const { pathname } = useLocation();
  return (
    <NavigationWrapper>
      <NavigationUl>
        {tabNavigation.map(({ name, link, icon }) => (
          <Navigationli key={name} isActive={link === pathname}>
            <NavigationLink to={link} isActive={link === pathname}>
              {icon && <img src={icon} alt={name} />}
              {name}
            </NavigationLink>
          </Navigationli>
        ))}
      </NavigationUl>
    </NavigationWrapper>
  );
};
