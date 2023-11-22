import styled from "styled-components";
import { Footer } from "../Footer";
import { Header } from "../Header";

export const MainLayout = ({ children }: { children: JSX.Element }) => {
    return (
        <Wrapper>
            {/* <Header /> */}
            {children}
            {/* <Footer /> */}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    background: #f8f8f8;
    min-height: 100vh;
`;
