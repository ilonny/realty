import { FC, ReactNode } from "react";
import { ActionBlock, ButtonsBlock, Title, Wrapper } from "./styles";
import { UIContainedButton, UIOutlinedButton } from "../button";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SaveIcon from "@mui/icons-material/Save";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";

interface IDetailWrapperProps {
  children: ReactNode;
  title: string;
  isEditMode?: boolean;
  onEditMode?: () => void;
  onSave?: () => void;
  onDelete?: () => void;
}

export const DetailWrapper: FC<IDetailWrapperProps> = ({
  children,
  title,
  isEditMode,
  onEditMode,
  onSave,
  onDelete,
}) => {
  return (
    <Wrapper>
      <ActionBlock>
        <Title>Информация {title}</Title>
        <ButtonsBlock>
          <UIOutlinedButton
            startIcon={<DeleteOutlineOutlinedIcon />}
            onClick={onDelete}
          >
            Удалить
          </UIOutlinedButton>
          {isEditMode && (
            <UIOutlinedButton startIcon={<SaveIcon />} onClick={onSave}>
              Сохранить
            </UIOutlinedButton>
          )}
          <UIContainedButton
            startIcon={<BorderColorOutlinedIcon />}
            onClick={onEditMode}
          >
            {isEditMode ? "Просмотр" : "Редактировать"}
          </UIContainedButton>
        </ButtonsBlock>
      </ActionBlock>
      {children}
    </Wrapper>
  );
};
