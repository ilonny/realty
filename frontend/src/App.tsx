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

const i18nProvider = polyglotI18nProvider(() => russianMessages, "ru");

export const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  authProvider?.getIdentity &&
    authProvider?.getIdentity().then((user) => {
      setIsAdmin(user.role === "admin");
    });
  return (
    <Admin
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
      />
      <Resource
        name="realty"
        create={RealtyCreate}
        list={RealtyList}
        edit={RealtyEdit}
        show={RealtyShow}
      />
      <Resource
        name="user"
        list={UserList}
        create={UserCreate}
        edit={UserEdit}
        show={UserShow}
      />
      {isAdmin && (
        <>
          <Resource
            name="district"
            create={DistrcitCreate}
            list={ListGuesser}
            edit={EditGuesser}
            show={ShowGuesser}
          />
          <Resource
            name="series"
            create={DistrcitCreate}
            list={ListGuesser}
            edit={EditGuesser}
            show={ShowGuesser}
          />
          <Resource
            name="rooms"
            create={DistrcitCreate}
            list={ListGuesser}
            edit={EditGuesser}
            show={ShowGuesser}
          />
          <Resource
            name="state"
            create={DistrcitCreate}
            list={ListGuesser}
            edit={EditGuesser}
            show={ShowGuesser}
          />
          <Resource
            name="type"
            create={DistrcitCreate}
            list={ListGuesser}
            edit={EditGuesser}
            show={ShowGuesser}
          />
          <Resource
            name="category"
            create={DistrcitCreate}
            list={ListGuesser}
            edit={EditGuesser}
            show={ShowGuesser}
          />
          <Resource
            name="communication"
            create={DistrcitCreate}
            list={ListGuesser}
            edit={EditGuesser}
            show={ShowGuesser}
          />
          <Resource
            name="developer"
            create={DistrcitCreate}
            list={ListGuesser}
            edit={EditGuesser}
            show={ShowGuesser}
          />
          <Resource
            name="apartment_complex"
            create={DistrcitCreate}
            list={ListGuesser}
            edit={EditGuesser}
            show={ShowGuesser}
          />
        </>
      )}
    </Admin>
  );
};
