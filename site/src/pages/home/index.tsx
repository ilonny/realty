import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { MainLayout } from "../../components/MainLayout";
import { Map } from "../../components/Map";

export const HomeScreen = () => {
    return (
        <>
            <MainLayout>
                <>
                    <Header />
                    <Map />
                    <Footer />
                </>
            </MainLayout>
        </>
    );
};
