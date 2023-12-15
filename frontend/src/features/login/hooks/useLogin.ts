import { useState, useCallback } from "react";
import { login } from "../network/login";

type TData = {
    login: string;
    password: string;
};

export const useLogin = (): [any, boolean, (arg: TData) => void, string] => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<string>("");

    const request = useCallback(async (data: TData) => {
        setLoading(true);
        const res = await login(data);
        if (res?.access_token) {
            localStorage.setItem("token", res.access_token);
            localStorage.setItem("user", JSON.stringify(res));
            setData(res);
        } else {
            setErrors(res.message);
            setLoading(false);
            throw Error;
        }
        setLoading(false);
    }, []);

    return [data, loading, request, errors];
};
