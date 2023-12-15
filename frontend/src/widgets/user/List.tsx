import {TableList} from "../../shared/components/tableList";
import {Box} from "@mui/material";
import {TableListWrapper} from "../../shared/components/tableListWrapper";
import {useEffect, useState} from "react";
import {API_URL} from "../../constants/globalApi.constants";
import {usersColumns} from "../../constants/app.constants";

export const List = () => {
    const [usersData, setAgentsData] = useState([]);

    useEffect(() => {
        fetch(API_URL + "/user/protected/user-list",
            {
                headers: new Headers({
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                }),
            })
            .then((res) => res.json())
            .then((res) => {
                setAgentsData(res);
            });
    }, []);
    console.log('usersData', usersData)

    return (
        <Box pl={2.5} pr={2.5}>
            <TableListWrapper title="Агенты" btnTitle="Создать агента">
                <TableList data={usersData} columns={usersColumns}/>
            </TableListWrapper>
        </Box>
    );
};
