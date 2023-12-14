import { TableList } from "../../shared/components/tableList";
import { Box } from "@mui/material";
import { TableListWrapper } from "../../shared/components/tableListWrapper";
import {useEffect, useState} from "react";
import {API_URL} from "../../constants/globalApi.constants";
import {ownersColumns} from "../../constants/app.constants";

export const List = () => {
    const [ownersData, setOwnersData] = useState([]);

    useEffect(() => {
        fetch(API_URL + "/" + "owner")
            .then((res) => res.json())
            .then((res) => {
                setOwnersData(res);
            });
    }, []);
    console.log('ownersData',ownersData)


  return (
    <Box pl={2.5} pr={2.5}>
      <TableListWrapper title="Клиенты" btnTitle="Создать клиента">
        <TableList data={ownersData} columns={ownersColumns}/>
      </TableListWrapper>
    </Box>
  );
};
