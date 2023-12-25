import { RecommendRealtyWrapper } from "./styles";
import { TableListWrapper } from "../../../../shared/components/tableListWrapper";
import { TableList } from "../../../../shared/components/tableList";
import { useEffect, useState } from "react";
import { API_URL } from "../../../../constants/globalApi.constants";
import { recommendRealty } from "../../../../constants/app.constants";
import { Box, CircularProgress } from "@mui/material";

export const RecommendRealty = ({ realty, loading }) => {
  console.log("RecommendRealty", realty);
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
