export const getFormDataFromParams = (params: any) => {
  // console.log("params", params);
  const formData = new FormData();
  Object.keys(params).forEach((key) => {
    if (params[key] == "undefined") {
      delete params[key];
    }
  });

  for (const param in params) {
    // console.log("param", param);
    const isNotUndef =
      params[param] !== "undefined" && params[param] !== undefined;
    if (params[param] == "undefined") {
      // console.log('params[param] == "undefined"');
      continue;
    }
    if (param === "photos" && isNotUndef && typeof params[param] === "object") {
      let oldFilesForSave: string[] = [];
      if (!Array.isArray(params[param])) {
        params[param] = [params[param]];
      }
      params[param]?.forEach((p) => {
        console.log("p?", p);
        if (p?.size) {
          formData.append("photos", p);
        }
        if (p?.rawFile) {
          formData.append("photos", p.rawFile);
        }
        if (!p?.rawFile && (p?.src || p?.source)) {
          oldFilesForSave.push("uploads/" + p.src.split("/").reverse()[0]);
        }
      });
      if (oldFilesForSave.length) {
        formData.append("oldFilesForSave", JSON.stringify(oldFilesForSave));
      }
      continue;
    }

    if (param === "photo" && isNotUndef && typeof params[param] === "object") {
      formData.append("photo", params[param].rawFile);
      continue;
    }
    if (
      param === "main_photo" &&
      isNotUndef &&
      typeof params[param] === "object" &&
      params[param]?.rawFile
    ) {
      formData.append("main_photo", params[param].rawFile);
      continue;
    }
    if (params[param] && isNotUndef) {
      formData.append(param, params[param]);
    }
  }
  // if (resource === "realty") {
  //   formData.append("address", localStorage.getItem("address") || "");
  // }
  return formData;
};
