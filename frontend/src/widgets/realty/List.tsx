import {TableList} from "../../shared/components/tableList";
import {Box} from "@mui/material";
import {TableListWrapper} from "../../shared/components/tableListWrapper";
import {realtiesColumns} from "../../constants/app.constants";
import {useEffect, useState} from "react";
import {API_URL} from "../../constants/globalApi.constants";

export const List = () => {
    const [realtiesData, setRealtiesData] = useState([]);

    useEffect(() => {
        fetch(API_URL + "/" + "realty")
            .then((res) => res.json())
            .then((res) => {
                setRealtiesData(res);
            });
    }, []);
    console.log('realtiesData', realtiesData)

    return (
        <Box pl={2.5} pr={2.5}>
            <TableListWrapper title="Объекты" btnTitle="Создать объект">
                <TableList columns={realtiesColumns} data={realtiesData}/>
            </TableListWrapper>
        </Box>
    );
};
