import { List } from "../../widgets/realty";
import { FilterProvider } from "../../widgets/realty/FilterContext";

export const RealtyList = () => {
  return (
    <div style={{ maxWidth: "1200px" }}>
      <FilterProvider>
        <List />
      </FilterProvider>
    </div>
  );
};
