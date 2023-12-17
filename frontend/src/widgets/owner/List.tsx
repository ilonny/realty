import { useCallback, useEffect, useState } from "react";
import { Box, CircularProgress } from "@mui/material";
import { TableList } from "../../shared/components/tableList";
import { TableListWrapper } from "../../shared/components/tableListWrapper";
import { API_URL } from "../../constants/globalApi.constants";
import { ownersColumns } from "../../constants/app.constants";
import { useNavigate } from "react-router-dom";

export const List = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [ownersData, setOwnersData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(API_URL + "/" + "owner", {
        headers: new Headers({
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }),
      }),
      fetch(API_URL + "/" + "user" + "/" + "protected" + "/" + "user-list", {
        headers: new Headers({
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }),
      }),
    ])
      .then((res) => res.map((item) => item.json()))
      .then(async (result) => {
        const agents = await result[1];
        const owners = await result[0];

        const resultOwner = owners.map((item) => {
          if (item["agent_id"]) {
            const agentOwner = agents.find(
              (agent) => agent.id == item.agent_id
            );
            if (agentOwner) {
              item["agent_id"] = `${agentOwner?.name}, ${agentOwner?.phone}`;
            }
          }
          return item;
        });
        setOwnersData(resultOwner);
      })
      .finally(() => setLoading(false));
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
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              paddingTop: "30px",
              height: "6em",
              background: "#fff",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <TableList
            data={ownersData}
            columns={ownersColumns}
            onClick={handleOwnerDetail}
          />
        )}
      </TableListWrapper>
    </Box>
  );
};
