import React, { useState, useCallback, useEffect } from "react";
import { API_URL } from "../constants";

export type TCtx = any;

const defaultState = {};
//@ts-ignore
export const FilterContext = React.createContext<TCtx>(defaultState);

export const FilterProvider = ({ children }: any) => {
    const [data, setData] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [series, setSeries] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [state, setState] = useState([]);
    const [type, setType] = useState([]);
    const [developer, setDeveloper] = useState([]);
    const [apartmentComplex, setApartmentComplex] = useState([]);

    const [loading, setLoading] = useState(false);

    const [districtsFilter, setDistrictsFilter] = useState([]);
    const [seriesFilter, setSeriesFilter] = useState([]);
    const [roomsFilter, setRoomsFilter] = useState([]);
    const [stateFilter, setStateFilter] = useState([]);
    const [typeFilter, setTypeFilter] = useState([]);
    const [priceMinFilter, setPriceMinFilter] = useState(0);
    const [priceMaxFilter, setPriceMaxFilter] = useState(100000);
    const [apartmentComplexFilter, setApartmentComplexFilter] =
        useState([]);

    const [categoryId, setCategoryId] = useState<number>(1);

    const getData = useCallback(() => {
        setLoading(true);
        fetch(API_URL + "/realty")
            .then((res) => res.json())
            .then((res) => {
                setData(res);
            })
            .finally(() => setLoading(false));
        fetch(API_URL + "/district")
            .then((res) => res.json())
            .then((res) => {
                setDistricts(res);
            })
            .finally(() => setLoading(false));
        fetch(API_URL + "/series")
            .then((res) => res.json())
            .then((res) => {
                setSeries(res);
            })
            .finally(() => setLoading(false));
        fetch(API_URL + "/rooms")
            .then((res) => res.json())
            .then((res) => {
                setRooms(res);
            })
            .finally(() => setLoading(false));
        fetch(API_URL + "/state")
            .then((res) => res.json())
            .then((res) => {
                setState(res);
            })
            .finally(() => setLoading(false));
        fetch(API_URL + "/type")
            .then((res) => res.json())
            .then((res) => {
                setType(res);
            })
            .finally(() => setLoading(false));
        fetch(API_URL + "/developer")
            .then((res) => res.json())
            .then((res) => {
                setDeveloper(res);
            })
            .finally(() => setLoading(false));
        fetch(API_URL + "/apartment_complex")
            .then((res) => res.json())
            .then((res) => {
                setApartmentComplex(res);
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        getData();
    }, [getData]);

    const clearFilterContext = useCallback(() => {
        setCategoryId(undefined);
    }, []);

    return (
        <FilterContext.Provider
            value={{
                categoryId,
                setCategoryId,
                clearFilterContext,
                loading,
                data,
                districts,
                districtsFilter,
                setDistrictsFilter,
                series,
                seriesFilter,
                setSeriesFilter,
                rooms,
                roomsFilter,
                setRoomsFilter,
                state,
                stateFilter,
                setStateFilter,
                type,
                typeFilter,
                setTypeFilter,
                priceMinFilter,
                setPriceMinFilter,
                priceMaxFilter,
                setPriceMaxFilter,
                developer,
                apartmentComplex,
                apartmentComplexFilter,
                setApartmentComplexFilter,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};
