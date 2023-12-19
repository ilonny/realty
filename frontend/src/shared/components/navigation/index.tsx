import {
  Navigationli,
  NavigationLink,
  NavigationUl,
  NavigationWrapper,
} from "./styled";
import { tabNavigation } from "../../../constants/app.constants";
import { useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import authProvider from "../../../authProvider";

export const NavigationTab = () => {
  const { pathname } = useLocation();
  const [tabs, setTabs] = useState(tabNavigation);
  const currentPathname = useMemo(() => {
    if (pathname) {
      return "/" + pathname.split("/")[1];
    }
    return "";
  }, [pathname]);

  useEffect(() => {
    // authProvider?.getIdentity &&
    //   authProvider?.getIdentity().then((user) => {
    //     if (user?.role === "admin") {
    //       setTabs((tabs) =>
    //         tabs.concat({ name: "Системные поля", link: "/other" })
    //       );
    //     }
    //   });
  }, []);

  return (
    <NavigationWrapper>
      <NavigationUl>
        {tabs.map(({ name, link, icon }) => {
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
