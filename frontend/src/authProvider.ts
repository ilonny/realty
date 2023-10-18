import { AuthProvider, HttpError, fetchUtils } from "react-admin";
import data from "./users.json";
const httpClient = fetchUtils.fetchJson;

/**
 * This authProvider is only for test purposes. Don't use it in production.
 */
export const authProvider: AuthProvider = {
  login: async ({ username, password }) => {
    const fd = new FormData();
    fd.append("login", username);
    fd.append("password", password);

    let user = await fetch(
      import.meta.env.VITE_SIMPLE_REST_URL + "/user/admin/login",
      {
        method: "POST",
        body: fd,
      }
    );

    user = await user.json();

    console.log("user", user);

    if (user.id) {
      // eslint-disable-next-line no-unused-vars
      localStorage.setItem("user", JSON.stringify(user));
      return Promise.resolve();
    }

    return Promise.reject(
      new HttpError("Unauthorized", 401, {
        message: "Invalid username or password",
      })
    );
  },
  logout: () => {
    localStorage.removeItem("user");
    return Promise.resolve();
  },
  checkError: () => Promise.resolve(),
  checkAuth: () =>
    localStorage.getItem("user") ? Promise.resolve() : Promise.reject(),
  getPermissions: () => {
    return Promise.resolve(undefined);
  },
  getIdentity: () => {
    const persistedUser = localStorage.getItem("user");
    const user = persistedUser ? JSON.parse(persistedUser) : null;

    return Promise.resolve(user);
  },
};

export default authProvider;
