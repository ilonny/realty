import React, { useState, useCallback } from "react";

export type TCtx = {
    vehicleType?: string;
    setVehicleType: (vehicleType: string | undefined) => void;

    clearFilterContext: () => void;
};

const defaultState = {};
//@ts-ignore
export const FilterContext = React.createContext<TCtx>(defaultState);

export const FilterProvider = ({ children }: any) => {
    const [vehicleType, setVehicleType] = useState<string | undefined>();

    const clearFilterContext = useCallback(() => {
        setVehicleType(undefined);
    }, []);

    return (
        <FilterContext.Provider
            value={{
                vehicleType,
                setVehicleType,
                clearFilterContext,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};
