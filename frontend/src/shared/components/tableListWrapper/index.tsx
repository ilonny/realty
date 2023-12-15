import { ReactNode, FC } from "react";
import { Block, Title } from "./styles";
import { UIContainedButton } from "../button";
import AddIcon from "@mui/icons-material/Add";

interface ITableListWrapperProps {
  title: string;
  children: ReactNode;
  btnTitle?: string;
  onCreate?: () => void;
}

export const TableListWrapper: FC<ITableListWrapperProps> = ({
  title,
  children,
  btnTitle = "Создать",
  onCreate,
}) => {
  return (
    <>
      <Block>
        <Title>{title}</Title>
        <UIContainedButton startIcon={<AddIcon />} onClick={onCreate}>
          {btnTitle}
        </UIContainedButton>
      </Block>
      {children}
    </>
  );
};
