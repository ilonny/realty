import { useState, useEffect, useCallback } from "react";
import { getToken } from "../utils/helpers";

export const useToken = () => {

    const [token, setToken] = useState<null | string>('');

    const getTokenFn = useCallback(() => {
        setToken(getToken());
    }, []);

    useEffect(() => {
        getTokenFn();
    }, [getTokenFn]);

    return [token, getTokenFn];
};
