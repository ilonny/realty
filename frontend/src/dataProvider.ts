import simpleRestProvider from "ra-data-simple-rest";
import { DataProvider, combineDataProviders, fetchUtils } from "react-admin";
import { stringify } from "query-string";
const sDataProvider = simpleRestProvider(import.meta.env.VITE_SIMPLE_REST_URL);

const apiUrl = import.meta.env.VITE_SIMPLE_REST_URL;
const httpClient = async (path: string, options?: Record<any, any>) => {
  return await fetchUtils.fetchJson(apiUrl + path, {
    headers: new Headers({
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }),
    ...options,
  });
};

const getFormDataFromParams = (params: any) => {
  console.log("params", params);
  const formData = new FormData();
  Object.keys(params).forEach((key) => {
    if (params[key] == "undefined") {
      delete params[key];
    }
  });
  for (const param in params.data) {
    const isNotUndef =
      params.data[param] !== "undefined" && params.data[param] !== undefined;
    if (params.data[param] == "undefined") {
      continue;
    }
    if (
      param === "photos" &&
      isNotUndef &&
      typeof params.data[param] === "object"
    ) {
      typeof params.data[param].forEach((p) => {
        formData.append("photos", p.rawFile);
      });
      continue;
    }
    if (
      param === "photo" &&
      isNotUndef &&
      typeof params.data[param] === "object"
    ) {
      formData.append("photo", params.data[param].rawFile);
      continue;
    }
    if (params.data[param] && isNotUndef) {
      formData.append(param, params.data[param]);
    }
  }
  return formData;
};

export const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    switch (resource) {
      case "user":
        const users = await httpClient("/user/protected/user-list");
        return { data: users.json, total: users.json.length };
      default:
        const data = await httpClient("/" + resource);
        return { data: data.json, total: data.json.length };
    }
  },
  create: async (resource, params) => {
    switch (resource) {
      case "user":
        const user = await httpClient("/user/protected/user-create", {
          method: "POST",
          body: getFormDataFromParams(params),
        });
        return { data: user.data };
      default:
        const data = await httpClient("/" + resource + "/create", {
          method: "POST",
          body: getFormDataFromParams(params),
        });
        return { data: data.data, id: 12321 };
    }
  },
  getOne: async (resource, params) => {
    switch (resource) {
      case "user":
        const user = await httpClient("/user/protected/user?id=" + params.id);
        return { data: user.json };
      default:
        const data = await httpClient(
          "/" + resource + "/get-one?id=" + params.id
        );
        return { data: data.json };
        break;
    }
  },
  update: async (resource, params) => {
    switch (resource) {
      case "user":
        const user = await httpClient("/user/protected/user-update", {
          method: "POST",
          body: getFormDataFromParams(params),
        });
        return { data: user.data };
      default:
        const data = await httpClient("/" + resource + "/update", {
          method: "POST",
          body: getFormDataFromParams(params),
        });
        return { data: data.data };
    }
  },
  delete: async (resource, params) => {
    switch (resource) {
      case "user":
        const user = await httpClient("/user/protected/user-delete", {
          method: "POST",
          body: JSON.stringify(params),
        });
        return { data: user.data };
      default:
        const data = await httpClient("/" + resource + "/delete", {
          method: "POST",
          body: JSON.stringify({ id: params.id }),
        });
        return { data: data.data };
        break;
    }
  },
};

// export const dataProvider = combineDataProviders((res) => {
//   return dataProvider1;
//   switch (res) {
//     case "user":
//       return dataProvider;

//     default:
//       return sDataProvider;
//   }
// });
