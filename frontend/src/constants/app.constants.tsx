import OwnerIcon from "../assets/icons/owner.svg";
import UserIcon from "../assets/icons/user.svg";
import RealtyIcon from "../assets/icons/realty.svg";
import { GridColDef } from "@mui/x-data-grid";

export const tabNavigation: {
  name: string;
  link: string;
  icon?: string;
}[] = [
  { name: "Клиенты", link: "/owner", icon: OwnerIcon },
  { name: "Недвижимость", link: "/realty", icon: UserIcon },
  { name: "Агенты", link: "/user", icon: RealtyIcon },
];

export const ownersColumns: GridColDef[] = [
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

export const usersColumns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  {
    field: "login",
    headerName: "Логин",
    flex: 1,
  },
  {
    field: "name",
    headerName: "Имя",
    flex: 1,
  },
  {
    field: "surname",
    headerName: "Фамилия",
    flex: 1,
  },
  {
    field: "thirdname",
    headerName: "Отчество",
    flex: 1,
  },
  {
    field: "mail",
    headerName: "E-mail",
    flex: 1,
  },
];

export const recommendRealty = [
  {
    field: "main_photo",
    headerName: "Фото",
    flex: 1,
    renderCell: (params) => {
      return (
        <img
          src={`https://neverhaveiever.ru/${params.value}`}
          width={"350px"}
        />
      );
    },
  },
  {
    field: "name",
    headerName: "Об объекте",
    flex: 1,
  },
  {
    field: "agent_id",
    headerName: "Контакты",
    flex: 1,
  },
  {
    field: "price",
    headerName: "Цена",
    width: 100,
  },
];
export const realtiesColumns: GridColDef[] = [
  { field: "id", headerName: "ID", flex: 1 },
  {
    field: "main_photo",
    headerName: "Фото",
    flex: 1,
    renderCell: (params) => {
      return (
        <img
          src={`https://neverhaveiever.ru/${params.value}`}
          width={"200px"}
        />
      );
    },
  },
  {
    field: "name",
    headerName: "Об объекте",
    flex: 1,
  },
  {
    field: "price",
    headerName: "Цена",
    flex: 1,
  },
  {
    field: "agent_id",
    headerName: "Контакты",
    flex: 1,
  },
];
