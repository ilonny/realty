import { createContext } from "react";
import { State } from "./StateProvider";

export interface StateContextValue {
  snackBar: State;
  handleSnackbar: ({ open, message }: State) => void;
}

export const StateContext = createContext<StateContextValue>(
  {} as StateContextValue
);
