import { TableList } from "../../shared/components/tableList";
import { Box } from "@mui/material";
import { TableListWrapper } from "../../shared/components/tableListWrapper";

export const List = () => {
  return (
    <Box pl={2.5} pr={2.5}>
      <TableListWrapper title="Объекты" btnTitle="Создать объект">
        <TableList />
      </TableListWrapper>
    </Box>
  );
};
