import { RecommendRealtyWrapper } from "./styles";
import { TableListWrapper } from "../../../../shared/components/tableListWrapper";
import { TableList } from "../../../../shared/components/tableList";
import { useEffect, useState } from "react";
import { API_URL } from "../../../../constants/globalApi.constants";
import { recommendRealty } from "../../../../constants/app.constants";
import { Box, CircularProgress } from "@mui/material";

export const RecommendRealty = () => {
  const [realty, setRealty] = useState([]);
  const [loading, setLoading] = useState(false);

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
        setRealty(resultRealty);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <RecommendRealtyWrapper>
      <TableListWrapper title={"Подходящая недвижимость"} noBtn>
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
          <TableList data={realty} columns={recommendRealty} />
        )}
      </TableListWrapper>
    </RecommendRealtyWrapper>
  );
};
