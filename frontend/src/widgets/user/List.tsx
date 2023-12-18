import { TableList } from "../../shared/components/tableList";
import { Box, CircularProgress } from "@mui/material";
import { TableListWrapper } from "../../shared/components/tableListWrapper";
import { useCallback, useEffect, useState } from "react";
import { API_URL } from "../../constants/globalApi.constants";
import { usersColumns } from "../../constants/app.constants";
import { useNavigate } from "react-router-dom";

export const List = () => {
  const [usersData, setAgentsData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch(API_URL + "/user/protected/user-list", {
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setAgentsData(res?.filter((r) => r.deleted !== "1"));
      })
      .finally(() => setLoading(false));
  }, []);

  const handleAgentDetail = useCallback(
    ({ id }: any) => {
      navigate(`${id}`);
    },
    [navigate]
  );

  const handleCreate = useCallback(() => {
    navigate("/user/create");
  }, [navigate]);

  return (
    <Box pl={2.5} pr={2.5}>
      <TableListWrapper
        title="Агенты"
        btnTitle="Создать агента"
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
            data={usersData}
            columns={usersColumns}
            onClick={handleAgentDetail}
          />
        )}
      </TableListWrapper>
    </Box>
  );
};
