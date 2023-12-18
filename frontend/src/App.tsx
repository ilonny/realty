import CssBaseline from "@mui/material/CssBaseline";
import { Routers } from "./app/routers";
import { useStateContext } from "./containers/stateContext";
import { Snackbar } from "@mui/material";
import { ChakraProvider } from "@chakra-ui/react";
import "./app.css";
export const App = () => {
  const { snackBar } = useStateContext();
  return (
    <>
      {/* <ChakraProvider> */}
        <CssBaseline />
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={snackBar.open}
          message={snackBar.message}
        />

        <Routers />
      {/* </ChakraProvider> */}
    </>
  );
};
