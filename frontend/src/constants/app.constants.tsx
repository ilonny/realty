import OwnerIcon from "../assets/icons/owner.svg";
import UserIcon from "../assets/icons/user.svg";
import RealtyIcon from "../assets/icons/realty.svg";

export const tabNavigation: {
  name: string;
  link: string;
  icon?: string;
}[] = [
  { name: "Клиенты", link: "/owner", icon: OwnerIcon },
  { name: "Недвижимость", link: "/realty", icon: UserIcon },
  { name: "Агенты", link: "/user", icon: RealtyIcon },
  { name: "Системные поля", link: "/other" },
];


