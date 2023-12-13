import { GridColDef } from "@mui/x-data-grid";
import { CustomDataGrid } from "./styles";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  {
    field: "name",
    headerName: "ФИО",
    flex: 1,
  },
  {
    field: "phone",
    headerName: "Телефон",
    flex: 1,
  },
  {
    field: "mail",
    headerName: "E-mail",
    flex: 1,
  },
  {
    field: "agent_id",
    headerName: "Контакты агента",
    flex: 1,
  },
];

const rows = [
  {
    id: 1,
    name: "иванов иван",
    phone: "+79195356312",
    email: null,
    agent_id: "1",
    category_id: null,
    price: null,
    state_id: null,
    district_id: null,
    apartment_complex_id: null,
  },
  {
    id: 2,
    name: "собственник админа",
    phone: "1321312",
    email: null,
    agent_id: "1",
    category_id: null,
    price: null,
    state_id: null,
    district_id: null,
    apartment_complex_id: null,
  },
  {
    id: 3,
    name: "собственник агента",
    phone: "12312312",
    email: "321",
    agent_id: "14",
    category_id: null,
    price: null,
    state_id: null,
    district_id: null,
    apartment_complex_id: null,
  },
  {
    id: 5,
    name: "Горнак Дмитрий Игоревич",
    phone: "89195356312",
    email: "lonnyfox@bk.ru",
    agent_id: "1",
    category_id: "3",
    price: null,
    state_id: null,
    district_id: "",
    apartment_complex_id: "",
  },
];

export const TableList = () => {
  return (
    <CustomDataGrid
      rows={rows}
      columns={columns}
      hideFooterPagination
      hideFooter
      disableColumnMenu
    />
  );
};
