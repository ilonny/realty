import ReactDOM from "react-dom/client";
import { App } from "./App";
import { StateProvider } from "./containers/stateContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StateProvider>
    <App />
  </StateProvider>
);
