import CssBaseline from "@mui/material/CssBaseline";
import { Routers } from "./app/routers";
import { useStateContext } from "./containers/stateContext";
import { Snackbar } from "@mui/material";

export const App = () => {
  const { snackBar } = useStateContext();
  return (
    <>
      <CssBaseline />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={snackBar.open}
        message={snackBar.message}
      />

      <Routers />
    </>
  );
};
