import styled from "styled-components";
import { Colors } from "../../constants";
import { StyledContent } from "../StyledContent";
import { Flex } from "@chakra-ui/react";
import LogoSrc from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";

export const Footer = () => {
    return (
        <>
            <Wrapper>
                <StyledContent>
                    <MainContent
                        alignItems="center"
                        justifyContent={"space-between"}
                        flexWrap="wrap"
                    >
                        <div className="logo">
                            <img src={LogoSrc} width={105} />
                            <p>
                                Агентство
                                <br />
                                недвижимости
                            </p>
                        </div>
                        <DataRow flexWrap="wrap">
                            <div className="col">
                                <Link to="/">Купить</Link>
                                <Link to="/sell">Продать</Link>
                                <Link to="/">Ипотека</Link>
                                <Link to="/">Консультация</Link>
                            </div>
                            <div className="col">
                                <Link to="/about">О компании</Link>
                                <Link to="/agents">Специалисты</Link>
                                <Link to="/contacts">Контакты</Link>
                            </div>
                            <div className="col">
                                <a href="tel:+996555052332">
                                    <Flex gap="5px">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M20 22.621l-3.521-6.795c-.008.004-1.974.97-2.064 1.011-2.24 1.086-6.799-7.82-4.609-8.994l2.083-1.026-3.493-6.817-2.106 1.039c-7.202 3.755 4.233 25.982 11.6 22.615.121-.055 2.102-1.029 2.11-1.033z" />
                                        </svg>
                                        <span>+996 990 766 008</span>
                                    </Flex>
                                </a>
                                <a href="#">
                                    <Flex gap="5px">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 2c3.196 0 6 2.618 6 5.602 0 3.093-2.493 7.132-6 12.661-3.507-5.529-6-9.568-6-12.661 0-2.984 2.804-5.602 6-5.602m0-2c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z" />
                                        </svg>
                                        <span>
                                            г. Бишкек, ул. Калык-Акиева 111а
                                        </span>
                                    </Flex>
                                </a>
                                <a href="mailto:jbn_company@list.ru">
                                    <Flex gap="5px">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M.026 24l11.974-11.607 11.974 11.607h-23.948zm11.964-23.961l-11.99 8.725v12.476l7.352-7.127-5.653-4.113 10.291-7.488 10.309 7.488-5.655 4.108 7.356 7.132v-12.476l-12.01-8.725z" />
                                        </svg>
                                        <span>jbn_company@list.ru</span>
                                    </Flex>
                                </a>
                                <a
                                    href="https://instagram.com/jbn.kg"
                                    target="_blank"
                                >
                                    <Flex gap="5px">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                        </svg>
                                        <span>jbn.kg</span>
                                    </Flex>
                                </a>
                            </div>
                        </DataRow>
                    </MainContent>
                </StyledContent>
            </Wrapper>
        </>
    );
};

const Wrapper = styled.footer`
    margin-top: 80px;
    padding: 80px 0;
    background: ${Colors.MAIN_BLACK};
    & .logo {
        p {
            text-transform: uppercase;
            color: #fff;
            font-weight: 600;
            line-height: 15px;
            margin-top: 10px;
        }
    }
    @media screen and (max-width: 800px) {
        margin-top: 40px;
        padding: 40px 0;
        & .logo {
            margin-bottom: 20px;
        }
    }
`;

const MainContent = styled(Flex)``;

const DataRow = styled(Flex)`
    font-size: 14px;
    color: #fff;
    & .col {
        min-width: 160px;
        & a {
            display: block;
            margin-bottom: 5px;
            cursor: pointer;
            text-decoration: none;
            &:hover {
                text-decoration: underline;
            }
        }
        & svg {
            width: 14px;
            height: 19px;
            fill: ${Colors.MAIN_RED};
        }
    }
`;
