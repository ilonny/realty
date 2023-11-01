import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { MainLayout } from "../../components/MainLayout";

export const HomeScreen = () => {
    return (
        <>
            <MainLayout>
                <>
                    <Header />
                    <h1>Home Screen</h1>
                    <Footer />
                </>
            </MainLayout>
        </>
    );
};
