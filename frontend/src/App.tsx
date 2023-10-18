import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import russianMessages from "ra-language-russian";
import polyglotI18nProvider from "ra-i18n-polyglot";

import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { useState } from "react";
import { UserList } from "./resources/users";
import { UserCreate } from "./resources/UserCreate";

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
      {isAdmin && (
        <Resource
          name="user"
          list={UserList}
          create={UserCreate}
          // edit={EditGuesser}
          // show={ShowGuesser}
        />
      )}
    </Admin>
  );
};
