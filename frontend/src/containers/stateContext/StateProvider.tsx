import { FC, ReactNode, useCallback, useMemo, useState } from "react";
import { StateContextValue } from "./StateContext";
import { StateContext } from "./StateContext";

export interface StateProviderProps {
  children: ReactNode;
}

export interface State {
  open: boolean;
  message: string;
}

export const StateProvider: FC<StateProviderProps> = ({ children }) => {
  const [snackBar, setSnackBar] = useState<State>({
    open: false,
    message: "",
  });

  const handleSnackbar = useCallback(({ open, message }: State) => {
    setSnackBar({ open, message });
  }, []);

  const contextValue: StateContextValue = useMemo(() => {
    return { snackBar, handleSnackbar };
  }, [snackBar]);

  return (
    <StateContext.Provider value={contextValue}>
      {children}
    </StateContext.Provider>
  );
};
