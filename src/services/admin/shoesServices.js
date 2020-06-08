import API from "utils/Axios";
import qs from "query-string";

export async function getAllShoes({ pageSize, page }) {
  const query = qs.stringify({ pageSize, page });
  return await API.get(`/admin/shoes?${query}`);
}

export async function getProviders() {
  return await API.get("/admin/provider");
}

export async function addProviders({ name }) {
  return await API.post("/admin/provider", { name });
}

export async function getColors() {
  return await API.get("/admin/color");
}

export async function addColor({ name }) {
  return await API.post("/admin/color", { name });
}

export async function getSizes() {
  return await API.get("/admin/size");
}

export async function addSize({ name }) {
  return await API.post("/admin/size", { name });
}

export async function deleteShoes({ ids }) {
  let query = "";
  for (let i = 0; i < ids.length; i++) {
    query += `ids=${ids[i]}`;
    query += i === ids.length - 1 ? "" : "&";
  }
  return await API.delete(`/admin/shoes?${query}`);
}
