import {
  Navigationli,
  NavigationLink,
  NavigationUl,
  NavigationWrapper,
} from "./styled";
import { tabNavigation } from "../../../constants/app.constants";
import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export const NavigationTab = () => {
  const { pathname } = useLocation();
  const currentPathname = useMemo(() => {
    if (pathname) {
      return "/" + pathname.split("/")[1];
    }
    return "";
  }, [pathname]);

  return (
    <NavigationWrapper>
      <NavigationUl>
        {tabNavigation.map(({ name, link, icon }) => {
          return (
            <Navigationli key={name} isActive={link === currentPathname}>
              <NavigationLink to={link} isActive={link === currentPathname}>
                {icon && <img src={icon} alt={name} />}
                {name}
              </NavigationLink>
            </Navigationli>
          );
        })}
      </NavigationUl>
    </NavigationWrapper>
  );
};
