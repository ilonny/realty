import { List } from "../../widgets/realty";
import { FilterProvider } from "../../widgets/realty/FilterContext";

export const RealtyList = () => {
  return (
    <FilterProvider>
      <List />
    </FilterProvider>
  );
};
