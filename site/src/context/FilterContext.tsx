import React, { useState, useCallback, useEffect, useMemo } from "react";
import { API_URL } from "../constants";

export type TCtx = any;

const defaultState = {};
//@ts-ignore
export const FilterContext = React.createContext<TCtx>(defaultState);

export const FilterProvider = ({ children }: any) => {
    const [data, setData] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [districtsParent, setDistrictsParent] = useState([]);
    const [series, setSeries] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [state, setState] = useState([]);
    const [type, setType] = useState([]);
    const [developer, setDeveloper] = useState([]);
    const [apartmentComplex, setApartmentComplex] = useState([]);

    const [loading, setLoading] = useState(false);

    const [idFilter, setIdFilter] = useState("");
    const [districtsFilter, setDistrictsFilter] = useState([]);
    const [seriesFilter, setSeriesFilter] = useState([]);
    const [roomsFilter, setRoomsFilter] = useState([]);
    const [stateFilter, setStateFilter] = useState([]);
    const [typeFilter, setTypeFilter] = useState();
    const [priceMinFilter, setPriceMinFilter] = useState(0);
    const [priceMaxFilter, setPriceMaxFilter] = useState(100000);
    const [apartmentComplexFilter, setApartmentComplexFilter] = useState([]);

    const [categoryId, setCategoryId] = useState<number | undefined>(0);

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
        fetch(API_URL + "/district_parent")
            .then((res) => res.json())
            .then((res) => {
                setDistrictsParent(res);
            })
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        getData();
    }, [getData]);

    const clearFilterContext = useCallback(() => {
        setIdFilter("");
        setDistrictsFilter([]);
        setSeriesFilter([]);
        setRoomsFilter([]);
        setStateFilter([]);
        setTypeFilter(undefined);
        setPriceMinFilter(0);
        setPriceMaxFilter(100000);
        setApartmentComplexFilter([]);

        setCategoryId(undefined);
    }, []);

    const filteredData = useMemo(() => {
        let result = data || [];
        if (categoryId) {
            result = result = result.filter((r) => r.category_id == categoryId);
        }
        if (parseInt(idFilter)) {
            result = result.filter((r) => r.id == idFilter);
        }

        if (Array.isArray(districtsFilter) && districtsFilter?.length) {
            result = result.filter((realty) => {
                return districtsFilter.some((f) => f.id == realty.district_id);
            });
        }

        if (Array.isArray(seriesFilter) && seriesFilter?.length) {
            result = result.filter((realty) => {
                return seriesFilter.some((f) => f.id == realty.series_id);
            });
        }

        if (Array.isArray(roomsFilter) && roomsFilter?.length) {
            result = result.filter((realty) => {
                return roomsFilter.some((f) => f.id == realty.rooms_id);
            });
        }

        if (Array.isArray(stateFilter) && stateFilter?.length) {
            result = result.filter((realty) => {
                return stateFilter.some((f) => f.id == realty.state_id);
            });
        }

        if (typeFilter) {
            result = result.filter((realty) => {
                return realty?.type_id == typeFilter;
            });
        }
        if (categoryId == 3 && apartmentComplexFilter) {
            if (
                Array.isArray(apartmentComplexFilter) &&
                apartmentComplexFilter?.length
            ) {
                result = result.filter((realty) => {
                    return apartmentComplexFilter.some(
                        (f) => f.id == realty.apartment_complex_id
                    );
                });
            }
        }
        if (priceMinFilter !== undefined && priceMaxFilter !== undefined) {
            result = result.filter((realty) => {
                if (
                    realty.price >= priceMinFilter &&
                    realty.price <= priceMaxFilter
                ) {
                    return true;
                }
                return false;
            });
        }
        // console.log("data, result", data, result);
        return result;
    }, [
        data,
        idFilter,
        districtsFilter,
        seriesFilter,
        categoryId,
        roomsFilter,
        stateFilter,
        priceMinFilter,
        priceMaxFilter,
        apartmentComplexFilter,
        typeFilter,
    ]);

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
                filteredData,
                idFilter,
                setIdFilter,
                districtsParent,
            }}
        >
            {children}
        </FilterContext.Provider>
    );
};
