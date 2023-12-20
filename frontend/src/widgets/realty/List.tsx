import { ChakraProvider } from "@chakra-ui/react";
import { TableList } from "../../shared/components/tableList";
import { Box, CircularProgress, Stack } from "@mui/material";
import { TableListWrapper } from "../../shared/components/tableListWrapper";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { API_URL } from "../../constants/globalApi.constants";
import { FilterContext } from "./FilterContext";
import Filters from "./Filters";
import { useNavigate } from "react-router-dom";
import { GridColDef } from "@mui/x-data-grid";
import {
  UIContainedButton,
  UIOutlinedButton,
} from "../../shared/components/button";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { PriceText } from "../../features/realty/components/priceText";
import { AreaText } from "../../features/realty/components/areaText";
import { AboutText } from "../../features/realty/components/aboutText";
import { ContactsBlock } from "../../features/realty/components/contactsBlock";
import authProvider from "../../authProvider";

export const List = () => {
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const { agents, districts } = useContext(FilterContext);

  useEffect(() => {
    authProvider.getIdentity().then((user) => {
      setCurrentUser(user);
    });
  }, []);

  const { filteredData, data } = useContext(FilterContext);
  const [realty, setRealty] = useState(filteredData ?? []);
  const navigate = useNavigate();

  useEffect(() => {
    setRealty(filteredData);
  }, [filteredData]);

  const handleCreate = useCallback(() => {
    navigate("/realty/create");
  }, [navigate]);

  const realtiesColumns: GridColDef[] = useMemo(
    () => [
      { field: "id", headerName: "ID", flex: 1 },
      {
        field: "main_photo",
        headerName: "Фото",
        flex: 1,
        renderCell: (params) => {
          return (
            <img
              src={`https://neverhaveiever.ru/${params.value}`}
              width={"200px"}
            />
          );
        },
      },
      {
        field: "name",
        headerName: "Об объекте",
        flex: 1,
        renderCell: (params) => {
          return (
            <AboutText
              id={params?.id}
              district={
                districts?.find((d) => d.id == params?.row?.district_id)?.name
              }
              conditions={params?.row?.conditions}
              type={params?.row?.type_id}
            >
              {params?.value}
            </AboutText>
          );
        },
      },
      {
        field: "price",
        headerName: "Цена",
        flex: 1,
        renderCell: (params) => {
          return (
            <Stack direction={"column"} alignItems={"flex-start"} gap={"8px"}>
              {params?.value && <PriceText>{params?.value}</PriceText>}
              {params?.row?.total_area && (
                <AreaText>{params?.row?.total_area}</AreaText>
              )}
            </Stack>
          );
        },
      },
      {
        field: "agent_id",
        headerName: "Контакты",
        flex: 1,
        renderCell: (params) => {
          return (
            <ContactsBlock
              owner={`${params?.row?.owner_name || ""} ${
                currentUser?.role == "admin" ||
                params?.row?.id == currentUser?.id
                  ? params?.row?.owner_phone
                  : ""
              }`}
              agent={(() => {
                const ag = agents?.find((a) => a.id == params?.row?.agent_id);
                if (!ag) {
                  return "";
                }
                return (
                  ag.name + (ag?.surname ? ' '+ag?.surname : "") + " " + ag?.phone
                );
              })()}
            />
          );
        },
      },
      {
        field: " ",
        headerName: " ",
        width: 250,
        sortable: false,
        renderCell: (params) => {
          return (
            <Stack
              direction={"column"}
              gap={"20px"}
              alignItems={"stretch"}
              width={"100%"}
            >
              {(params?.row?.agent_id == currentUser?.id ||
                currentUser?.role === "admin") && (
                <UIContainedButton
                  onClick={() =>
                    navigate(`${params.id}`, { state: { isEditable: true } })
                  }
                  startIcon={<BorderColorOutlinedIcon />}
                >
                  Редактирование
                </UIContainedButton>
              )}
              <UIOutlinedButton
                onClick={() =>
                  navigate(`${params.id}`, { state: { isEditable: false } })
                }
                startIcon={<VisibilityOutlinedIcon />}
              >
                Просмотр
              </UIOutlinedButton>
            </Stack>
          );
        },
      },
    ],
    [currentUser]
  );

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
            rowSelection={false}
            data={realty}
            // onClick={handleOwnerDetail}
          />
        )}
      </TableListWrapper>
    </Box>
  );
};
