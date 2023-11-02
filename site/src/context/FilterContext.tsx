import React, { useState, useCallback, useEffect } from "react";
import { API_URL } from "../constants";

export type TCtx = {
    vehicleType?: string;
    setVehicleType: (vehicleType: string | undefined) => void;
    data: any;
    setData: any;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    clearFilterContext: () => void;
};

const defaultState = {};
//@ts-ignore
export const FilterContext = React.createContext<TCtx>(defaultState);

export const FilterProvider = ({ children }: any) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const [vehicleType, setVehicleType] = useState<string | undefined>();

    const getData = useCallback(() => {
        setLoading(true);
        fetch(API_URL + "/realty")
            .then((res) => res.json())
            .then((res) => {
                console.log("res?", res);
                setData(res);
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        getData();
    }, [getData]);

    const clearFilterContext = useCallback(() => {
        setVehicleType(undefined);
    }, []);

    return (
        <FilterContext.Provider
            value={{
                vehicleType,
                setVehicleType,
                clearFilterContext,
                loading,
                data,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};
