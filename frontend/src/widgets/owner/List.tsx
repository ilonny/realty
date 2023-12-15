import { useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { TableList } from "../../shared/components/tableList";
import { TableListWrapper } from "../../shared/components/tableListWrapper";
import { API_URL } from "../../constants/globalApi.constants";
import { ownersColumns } from "../../constants/app.constants";
import { useNavigate } from "react-router-dom";

export const List = () => {
  const [ownersData, setOwnersData] = useState([]);
  const [agents, setAgents] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(API_URL + "/" + "owner", {
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setOwnersData(res);
      });
  }, []);

  useEffect(() => {
    fetch(API_URL + "/" + "user" + "/" + "protected" + "/" + "user-list", {
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setAgents(res);
      });
  }, []);

  const handleOwnerDetail = useCallback(
    ({ id }: any) => {
      navigate(`${id}`);
    },
    [navigate]
  );

  const handleCreate = useCallback(() => {
    navigate("/owner/create");
  }, [navigate]);

  return (
    <Box pl={2.5} pr={2.5}>
      <TableListWrapper
        title="Клиенты"
        btnTitle="Создать клиента"
        onCreate={handleCreate}
      >
        <TableList
          data={ownersData}
          columns={ownersColumns}
          onClick={handleOwnerDetail}
        />
      </TableListWrapper>
    </Box>
  );
};
