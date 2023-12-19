import { AreaTextWrapper } from "./styled";
import { ReactNode } from "react";

export const AreaText = ({ children }: { children: ReactNode }) => (
  <AreaTextWrapper>
    {children} м<sup>2</sup>
  </AreaTextWrapper>
);
