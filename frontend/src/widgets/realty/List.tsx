import { ChakraProvider } from "@chakra-ui/react";
import { TableList } from "../../shared/components/tableList";
import { Box, CircularProgress } from "@mui/material";
import { TableListWrapper } from "../../shared/components/tableListWrapper";
import { realtiesColumns } from "../../constants/app.constants";
import { useCallback, useContext, useEffect, useState } from "react";
import { API_URL } from "../../constants/globalApi.constants";
import { RecommendRealtyWrapper } from "../../features/owner/components/recommendRealty/styles";
import { FilterContext } from "./FilterContext";
import Filters from "./Filters";
import { useNavigate } from "react-router-dom";

export const List = () => {
  const [loading, setLoading] = useState(false);

  const { filteredData, data } = useContext(FilterContext);
  const realty = filteredData;
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch(API_URL + "/" + "realty", {
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
        const realty = await result[0];

        const resultRealty = realty.map((item) => {
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
    navigate("/realty/create");
  }, [navigate]);

  return (
    <Box pl={2.5} pr={2.5}>
      <ChakraProvider>
        <Filters />
      </ChakraProvider>
      <TableListWrapper
        title="Объекты"
        btnTitle="Создать объект"
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
            columns={realtiesColumns}
            data={realty}
            onClick={handleOwnerDetail}
          />
        )}
      </TableListWrapper>
    </Box>
  );
};
