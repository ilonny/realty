import { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { StyledContent } from "../StyledContent";
import { Link, NavLink } from "react-router-dom";
import { styled } from "styled-components";
import { Colors } from "../../constants";
import LogoSrc from "../../assets/images/logo.svg";
import PhoneSrc from "../../assets/images/phone.svg";
import BurgerSrc from "../../assets/images/burger.svg";

export const Header = () => {
    const [sidebarOpened, setSidebarOpened] = useState(false);
    useEffect(() => {
        setSidebarOpened(false);
    }, [window?.location?.hash]);
    return (
        <HeaderWrap>
            <StyledContent>
                <DesktopHeader>
                    <Flex
                        justifyContent={"space-between"}
                        alignItems="center"
                        minHeight={"90px"}
                    >
                        <Link to={"/"}>
                            <img alt="logo" src={LogoSrc} />
                        </Link>
                        <Flex gap={"20px"}>
                            <LinksList />
                        </Flex>
                        <PhoneLink />
                    </Flex>
                </DesktopHeader>
                <TabletHeader>
                    <Flex
                        justifyContent={"space-between"}
                        alignItems="center"
                        minHeight={"54px"}
                    >
                        <BurgerButton
                            onClick={() => setSidebarOpened((s) => !s)}
                        >
                            <img src={BurgerSrc} alt="menu opener" />
                        </BurgerButton>
                        <Link to={"/"}>
                            <img
                                alt="logo"
                                src={LogoSrc}
                                style={{
                                    position: "absolute",
                                    left: "50%",
                                    marginLeft: "-40px",
                                }}
                            />
                        </Link>
                        <PhoneLink />
                    </Flex>
                </TabletHeader>
                <MobileHeader>
                    <Flex
                        justifyContent={"space-between"}
                        alignItems="center"
                        minHeight={"54px"}
                    >
                        <img alt="logo" src={LogoSrc} />
                        <BurgerButton
                            onClick={() => setSidebarOpened((s) => !s)}
                        >
                            <img src={BurgerSrc} alt="menu opener" />
                        </BurgerButton>
                    </Flex>
                </MobileHeader>
            </StyledContent>
            {sidebarOpened && (
                <SideBar>
                    <br />
                    <LinksList />
                    <br />
                    <PhoneLink />
                </SideBar>
            )}
        </HeaderWrap>
    );
};

const PhoneLink = () => {
    return (
        <StyledLinkContainer>
            <a href="tel:+996990766008">
                <Flex gap={"10px"}>
                    <img src={PhoneSrc} alt="phone icon" />
                    <span>+996 990 766 008</span>
                </Flex>
            </a>
        </StyledLinkContainer>
    );
};

const LinksList = () => {
    return (
        <>
            <StyledLinkContainer>
                <NavLink
                    className={({ isActive }) => {
                        return isActive ? "active" : "";
                    }}
                    to={"/"}
                >
                    Купить
                </NavLink>
            </StyledLinkContainer>
            <StyledLinkContainer>
                <NavLink to={"/sell"}>Продать</NavLink>
            </StyledLinkContainer>
            <StyledLinkContainer>
                <NavLink to={"/about"}>О компании</NavLink>
            </StyledLinkContainer>
            <StyledLinkContainer>
                <NavLink to={"/agents"}>Агенты</NavLink>
            </StyledLinkContainer>
            <StyledLinkContainer>
                <NavLink to={"/contacts"}>Контакты</NavLink>
            </StyledLinkContainer>
        </>
    );
};

const DesktopHeader = styled.div``;
const TabletHeader = styled.div`
    display: none;
`;
const MobileHeader = styled.div`
    display: none;
`;

const SideBar = styled.div`
    display: none;
    position: fixed;
    top: 54px;
    width: 100%;
    height: 100%;
    padding: 10px;
    background: white;
    z-index: 1;
    & a {
        margin-bottom: 20px;
        display: block;
    }
`;

const HeaderWrap = styled.div`
    background: #fff;
    @media screen and (max-width: 800px) {
        & ${DesktopHeader} {
            display: none;
        }
        & ${TabletHeader} {
            display: block;
        }
        & ${SideBar} {
            display: block;
        }
    }
    @media screen and (max-width: 440px) {
        & ${DesktopHeader} {
            display: none;
        }
        & ${TabletHeader} {
            display: none;
        }
        & ${MobileHeader} {
            display: block;
        }
    }
`;

const StyledLinkContainer = styled.div`
    & a {
        text-decoration: none;
        color: ${Colors.MAIN_BLACK};
        font-weight: 500;
        &.active {
            color: ${Colors.MAIN_RED};
        }
    }
`;

const BurgerButton = styled.button`
    background: transparent;
    padding-top: 10px;
    padding-bottom: 10px;
    border: none;
`;
