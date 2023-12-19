import { PriceTextWrapper } from "./styled";
import { ReactNode } from "react";

export const PriceText = ({ children }: { children: ReactNode }) => (
  <PriceTextWrapper>$ {children}</PriceTextWrapper>
);
