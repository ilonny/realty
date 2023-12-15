import {API_URL} from "../../../constants/globalApi.constants";

type TData = {
    login: string;
    password: string;
};

const endpoint: string = `${API_URL}/user/admin/login/`;

export const login = async (data: TData): Promise<ReturnType<any>> => {
    return await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(data).toString(),
    })
        .then((response) => response.json())
        .then((res) => res);
};
