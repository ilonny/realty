// import simpleRestProvider from "ra-data-simple-rest";

// export const dataProvider = simpleRestProvider(
//   import.meta.env.VITE_SIMPLE_REST_URL
// );
import { DataProvider, fetchUtils } from "react-admin";
import { stringify } from "query-string";

const apiUrl = import.meta.env.VITE_SIMPLE_REST_URL;
const httpClient = async (path: string, options: Record<any, any>) => {
  return await fetchUtils.fetchJson(apiUrl + path, {
    headers: new Headers({
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }),
    ...options,
  });
};

export const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    switch (resource) {
      case "user":
        const users = await httpClient("/user/protected/user-list");
        return { data: users.json, total: users.json.length };
      default:
        break;
    }
  },
  create: async (resource, params) => {
    console.log("create: ", resource, params);
    switch (resource) {
      case "user":
        const user = await httpClient("/user/protected/user-create", {
          method: "POST",
          body: JSON.stringify(params.data),
        });
        return { data: user.data };
      default:
        break;
    }
  },
};
