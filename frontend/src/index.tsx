import ReactDOM from "react-dom/client";
import { App } from "./App";
import { StateProvider } from "./containers/stateContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StateProvider>
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <App />
    </div>
  </StateProvider>
);
