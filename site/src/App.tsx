import "./App.css";
import { HashRouter, Route, Routes } from "react-router-dom";
import { HomeScreen } from "./pages/home";

function App() {
    return (
        <HashRouter>
            <Routes>
                <Route index element={<HomeScreen />} />
            </Routes>
        </HashRouter>
    );
}

export default App;
