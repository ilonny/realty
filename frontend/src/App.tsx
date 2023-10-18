import {
  Admin,
  Resource,
  ListGuesser,
  EditGuesser,
  ShowGuesser,
} from "react-admin";
import { dataProvider } from "./dataProvider";
import { authProvider } from "./authProvider";
import { useState } from "react";

export const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const currentUser =
    authProvider?.getIdentity &&
    authProvider?.getIdentity().then((user) => {
      console.log("authProvider?.getIdentity", user);
      setIsAdmin(user.role === "admin");
    });
  console.log("currentUser", currentUser);
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
      {isAdmin && (
        <Resource
          name="auth"
          list={ListGuesser}
          edit={EditGuesser}
          show={ShowGuesser}
        />
      )}
    </Admin>
  );
};
