import simpleRestProvider from "ra-data-simple-rest";
import { DataProvider, combineDataProviders, fetchUtils } from "react-admin";
import { stringify } from "query-string";
import authProvider from "./authProvider";
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

const getFormDataFromParams = (params: any, resource: any) => {
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
      let oldFilesForSave: string[] = [];
      params.data[param]?.forEach((p) => {
        console.log("p?", p);
        if (p.rawFile) {
          formData.append("photos", p.rawFile);
        }
        if (!p.rawFile && p.src) {
          oldFilesForSave.push("uploads/" + p.src.split("/").reverse()[0]);
        }
      });
      if (oldFilesForSave.length) {
        formData.append("oldFilesForSave", JSON.stringify(oldFilesForSave));
      }
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
    if (
      param === "main_photo" &&
      isNotUndef &&
      typeof params.data[param] === "object" &&
      params.data[param]?.rawFile
    ) {
      formData.append("main_photo", params.data[param].rawFile);
      continue;
    }
    if (params.data[param] && isNotUndef) {
      formData.append(param, params.data[param]);
    }
  }
  // if (resource === "realty") {
  //   formData.append("address", localStorage.getItem("address") || "");
  // }
  return formData;
};

export const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    switch (resource) {
      case "user":
        const users = await httpClient("/user/protected/user-list");
        try {
          const user = JSON.parse(localStorage.getItem("user"));
          if (user.role === "admin") {
            return { data: users.json, total: users.json.length };
          } else {
            return {
              data: users.json.filter((u) => u.id === user.id),
              total: users.json.filter((u) => u.id === user.id).length,
            };
          }
        } catch (err) {
          return { data: users.json, total: users.json.length };
        }
        authProvider.getIdentity().then((user) => {
          if (user.role === "admin") {
            return { data: users.json, total: users.json.length };
          } else {
            return {
              data: users.json.filter((user) => user.id === user.id),
              total: users.json.filter((user) => user.id === user.id).length,
            };
          }
        });
      default:
        const data = await httpClient("/" + resource);
        if (resource === "realty") {
          console.log("params", params);
          let res = data.json;
          if (params?.filter?.category_id) {
            console.log("data.json", data.json);
            const category_id = params.filter.category_id.toString();
            res = data.json.filter((d) => d.category_id == category_id);
          }
          if (params?.filter?.district_id) {
            const district_id = params.filter.district_id.toString();
            res = data.json.filter((d) => d.district_id == district_id);
          }
          if (params?.filter?.apartment_complex_id) {
            const apartment_complex_id =
              params.filter.apartment_complex_id.toString();
            res = data.json.filter(
              (d) => d.apartment_complex_id == apartment_complex_id
            );
          }
          if (params?.filter?.id) {
            const id = params.filter.id;
            res = data.json.filter((d) => d.id == id);
          }
          if (params?.filter?.price_min) {
            const price_min = params.filter.price_min;
            res = data.json.filter((d) => d.price >= price_min);
          }
          if (params?.filter?.price_max) {
            const price_max = params.filter.price_max;
            res = data.json.filter((d) => d.price <= price_max);
          }
          if (params?.filter?.series_id) {
            const series_id = params.filter.series_id;
            res = data.json.filter((d) => d.series_id == series_id);
          }
          if (params?.filter?.rooms_id) {
            const rooms_id = params.filter.rooms_id;
            res = data.json.filter((d) => d.rooms_id == rooms_id);
          }
          return {
            data: res,
            total: res.length,
          };
        }

        if (resource === "owner") {
          console.log("owner data", data.json);
          try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (user.role === "admin") {
              return { data: data.json, total: data.json.length };
            } else {
              return {
                data: data.json.filter((u) => u.agent_id == user.id),
                total: data.json.filter((u) => u.agent_id == user.id).length,
              };
            }
          } catch (err) {
            return { data: data.json, total: data.json.length };
          }
        }

        return { data: data.json, total: data.json.length };
    }
  },
  getMany: async (resource, params) => {
    switch (resource) {
      case "user":
        const users = await httpClient("/user/protected/user-list");
        return { data: users.json, total: users.json.length };
      default:
        const data = await httpClient("/" + resource);
        if (resource === "realty") {
          if (params?.filter?.user_id) {
            const user_id = params.filter.user_id;
            return {
              data: data.json.filter((d) => d.agent_id == user_id),
              total: data.json.filter((d) => d.agent_id == user_id).length,
            };
          }
        }

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
          body: getFormDataFromParams(params, resource),
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
        return { data: data.json, id: data.json?.id || "" };
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
          body: getFormDataFromParams(params, resource),
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
