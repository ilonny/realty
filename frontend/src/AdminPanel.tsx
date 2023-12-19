import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
  Empty,
} from "react-admin";
import russianMessages from "ra-language-russian";
import polyglotI18nProvider from "ra-i18n-polyglot";

import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { useState } from "react";
import { UserList } from "./resources/users";
import { UserCreate } from "./resources/UserCreate";
import { UserEdit } from "./resources/UserEdit";
import { UserShow } from "./resources/UserShow";
import { DistrcitCreate } from "./resources/DistrcitCreate";
import { RealtyCreate } from "./resources/RealtyCreate";
import { RealtyList } from "./resources/RealtyList";
import { RealtyEdit } from "./resources/RealtyEdit";
import { OwnerCreate } from "./resources/OwnerCreate";
import { OwnerEdit } from "./resources/OwnerEdit";
import { OwnerList } from "./resources/OwnerList";
import { RealtyShow } from "./resources/RealtyShow";

const i18nProvider = polyglotI18nProvider(() => {
  return {
    ...russianMessages,
    resources: {
      shoe: {
        name: "Owner |||| Owners",
        fields: {
          model: "Собственники",
          stock: "Nb in stock",
          color: "Color",
        },
      },
    },
  };
}, "ru");

export const AdminPanel = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  authProvider?.getIdentity &&
    authProvider?.getIdentity().then((user) => {
      setIsAdmin(user.role === "admin");
    });
  return (
    <Admin
      basename="other"
      dataProvider={dataProvider}
      authProvider={authProvider}
      i18nProvider={i18nProvider}
    >
      <Resource
        name="owner"
        create={OwnerCreate}
        list={OwnerList}
        edit={OwnerEdit}
        show={ShowGuesser}
        options={{
          label: "Клиенты",
        }}
      />
      <Resource
        name="realty"
        create={RealtyCreate}
        list={RealtyList}
        edit={RealtyEdit}
        show={RealtyShow}
        options={{
          label: "Недвижимость",
        }}
      />
      <Resource
        name="user"
        list={UserList}
        create={UserCreate}
        edit={UserEdit}
        show={UserShow}
        options={{
          label: "Агенты",
        }}
      />
      {isAdmin && (
        <>
          <Resource
            name="district"
            create={DistrcitCreate}
            list={ListGuesser}
            edit={EditGuesser}
            show={ShowGuesser}
            options={{
              label: "Районы",
            }}
          />
          <Resource
            name="series"
            create={DistrcitCreate}
            list={ListGuesser}
            edit={EditGuesser}
            show={ShowGuesser}
            options={{
              label: "Серии",
            }}
          />
          <Resource
            name="rooms"
            create={DistrcitCreate}
            list={ListGuesser}
            edit={EditGuesser}
            show={ShowGuesser}
            options={{
              label: "Комнаты",
            }}
          />
          <Resource
            name="state"
            create={DistrcitCreate}
            list={ListGuesser}
            edit={EditGuesser}
            show={ShowGuesser}
            options={{
              label: "Состояния недвижимости",
            }}
          />
          <Resource
            name="type"
            create={DistrcitCreate}
            list={ListGuesser}
            edit={EditGuesser}
            show={ShowGuesser}
            options={{
              label: "Типы отношений",
            }}
          />
          <Resource
            name="category"
            create={DistrcitCreate}
            list={ListGuesser}
            edit={EditGuesser}
            show={ShowGuesser}
            options={{
              label: "Категории недвижимости",
            }}
          />
          <Resource
            name="communication"
            create={DistrcitCreate}
            list={ListGuesser}
            edit={EditGuesser}
            show={ShowGuesser}
            options={{
              label: "Типы коммуникаций",
            }}
          />
          <Resource
            name="developer"
            create={DistrcitCreate}
            list={ListGuesser}
            edit={EditGuesser}
            show={ShowGuesser}
            options={{
              label: "Застройщики",
            }}
          />
          <Resource
            name="apartment_complex"
            create={DistrcitCreate}
            list={ListGuesser}
            edit={EditGuesser}
            show={ShowGuesser}
            options={{
              label: "Жилые комплексы",
            }}
          />
        </>
      )}
    </Admin>
  );
};