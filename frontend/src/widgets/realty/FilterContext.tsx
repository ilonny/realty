import React, { useState, useCallback, useEffect, useMemo } from "react";
import { API_URL } from "../../constants/globalApi.constants";
import authProvider from "../../authProvider";

export type TCtx = any;

const defaultState = {};
//@ts-ignore
export const FilterContext = React.createContext<TCtx>(defaultState);

export const FilterProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    authProvider.getIdentity().then((user) => {
      setCurrentUser(user);
    });
  }, []);

  const [data, setData] = useState([]);
  const [agents, setAgents] = useState([]);
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
  const [seriesFilter, setSeriesFilter] = useState();
  const [roomsFilter, setRoomsFilter] = useState();
  const [stateFilter, setStateFilter] = useState();
  const [typeFilter, setTypeFilter] = useState();
  const [priceMinFilter, setPriceMinFilter] = useState(0);
  const [priceMaxFilter, setPriceMaxFilter] = useState(100000);
  const [onlyMyFilter, setOnlyMyFilter] = useState(0);
  const [apartmentComplexFilter, setApartmentComplexFilter] = useState([]);

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
    fetch(API_URL + "/district_parent")
      .then((res) => res.json())
      .then((res) => {
        setDistrictsParent(res);
      })
      .finally(() => setLoading(false));
    fetch(API_URL + "/user/protected/user-list", {
      headers: new Headers({
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setAgents(res);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const resultRealty = data.map((item) => {
      if (districts?.length && item["district_id"]) {
        const realtyDistricts = districts.find(
          (realty) => realty?.id == item?.district_id
        );
        if (realtyDistricts) {
          item["district_id"] = realtyDistricts?.name;
        }
      }
      if (agents?.length && item["agent_id"]) {
        const realtyAgents = agents?.find(
          (agent) => agent?.id == item?.agent_id
        );
        if (realtyAgents) {
          item["agent_id"] = `${realtyAgents?.name} ${realtyAgents?.phone}`;
        }
      }
      return item;
    });
    setData(resultRealty);
  }, [districts, agents]);

  useEffect(() => {
    getData();
  }, [getData]);

  const clearFilterContext = useCallback(() => {
    setIdFilter("");
    setDistrictsFilter([]);
    setSeriesFilter(undefined);
    setRoomsFilter(undefined);
    setStateFilter(undefined);
    setTypeFilter(undefined);
    setPriceMinFilter(0);
    setPriceMaxFilter(100000);
    setApartmentComplexFilter([]);

    setCategoryId(1);
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
    if (seriesFilter && categoryId == 1) {
      result = result.filter((realty) => {
        return realty?.series_id == seriesFilter;
      });
    }
    if (roomsFilter) {
      result = result.filter((realty) => {
        return realty?.rooms_id == roomsFilter;
      });
    }
    if (stateFilter) {
      result = result.filter((realty) => {
        return realty?.state_id == stateFilter;
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
        if (realty.price >= priceMinFilter && realty.price <= priceMaxFilter) {
          return true;
        }
        return false;
      });
    }

    if (onlyMyFilter && currentUser?.id) {
      result = result.filter((realty) => {
        if (realty.agent_id == currentUser?.id) {
          return true;
        }
        return false;
      });
    }

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
    onlyMyFilter,
    currentUser,
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
        onlyMyFilter,
        setOnlyMyFilter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
