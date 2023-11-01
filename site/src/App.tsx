import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import { HomeScreen } from "./pages/home";
import { FilterProvider } from "./context/FilterContext";

function App() {
    return (
        <FilterProvider>
            <HashRouter>
                <Routes>
                    <Route index element={<HomeScreen />} />
                    <Route path={"/sell"} element={<HomeScreen />} />
                </Routes>
            </HashRouter>
        </FilterProvider>
    );
}

export default App;
