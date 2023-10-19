import { DataProvider, fetchUtils } from "react-admin";
import { stringify } from "query-string";

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
        break;
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
        break;
    }
  },
  getOne: async (resource, params) => {
    switch (resource) {
      case "user":
        const user = await httpClient("/user/protected/user?id=" + params.id);
        return { data: user.json };
      default:
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
        break;
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
        break;
    }
  },
};
