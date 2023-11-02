import { Spacer } from "@chakra-ui/react";
import Filters from "../../components/Filters";
import { Footer } from "../../components/Footer";
import { Header } from "../../components/Header";
import { MainLayout } from "../../components/MainLayout";
import { Map } from "../../components/Map";

export const HomeScreen = () => {
    return (
        <>
            <MainLayout>
                <div>
                    <Map />
                    <Spacer height={10} />
                    <Filters />
                    <Spacer height={10} />
                </div>
            </MainLayout>
        </>
    );
};
