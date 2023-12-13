import { ReactNode, FC } from "react";
import { Block, Title } from "./styles";
import { UIContainedButton } from "../button";

interface ITableListWrapperProps {
  title: string;
  children: ReactNode;
  btnTitle?: string;
}

export const TableListWrapper: FC<ITableListWrapperProps> = ({
  title,
  children,
  btnTitle = "Создать",
}) => {
  return (
    <>
      <Block>
        <Title>{title}</Title>
        <UIContainedButton>{btnTitle}</UIContainedButton>
      </Block>
      {children}
    </>
  );
};
