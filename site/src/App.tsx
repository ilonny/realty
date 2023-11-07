import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import { HomeScreen } from "./pages/home";
import { FilterProvider } from "./context/FilterContext";
import { ChakraProvider } from "@chakra-ui/react";
import { RealtyScreen } from "./pages/realty";
import { AgentsScreen } from "./pages/agents";

function App() {
    return (
        <ChakraProvider>
            <FilterProvider>
                <HashRouter>
                    <Routes>
                        <Route index element={<HomeScreen />} />
                        <Route
                            path={"/realty/:id"}
                            element={<RealtyScreen />}
                        />
                        <Route path={"/sell"} element={<HomeScreen />} />
                        <Route path={"/agents"} element={<AgentsScreen />} />
                    </Routes>
                </HashRouter>
            </FilterProvider>
        </ChakraProvider>
    );
}

export default App;
