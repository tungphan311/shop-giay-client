import API from "utils/Axios";
import qs from "query-string";

let token = localStorage.getItem("identity");
token = token.substring(1, token.length - 1);

const config = { headers: { Authorization: `Bearer ${token}` } };

export async function getAllShoes({ pageSize, page }) {
  const query = qs.stringify({ "page-size": pageSize, page });
  if (!pageSize || !page) {
    return await API.get(`/admin/shoes`, config);
  }
  return await API.get(`/admin/shoes?${query}`, config);
}

export async function getProviders() {
  return await API.get("/admin/provider", config);
}

export async function addProviders({ name }) {
  return await API.post("/admin/provider", { name }, config);
}

export async function getColors() {
  return await API.get("/admin/color", config);
}

export async function addColor({ name }) {
  return await API.post("/admin/color", { name }, config);
}

export async function getSizes() {
  return await API.get("/admin/size", config);
}

export async function addSize({ name }) {
  return await API.post("/admin/size", { name }, config);
}

export async function getGenders() {
  return await API.get("/admin/gender", config);
}

export async function getShoesType() {
  return await API.get("/admin/shoestype", config);
}

export async function getShoesBrand() {
  return await API.get("/admin/shoesbrand", config);
}

export async function getShoesById({ id }) {
  return await API.get(`/admin/shoes/${id}`, config);
}

export async function editShoes({
  id,
  name,
  code,
  price,
  images,
  stocks,
  genderId,
  brandId,
  styleId,
  description,
}) {
  return await API.put(
    `/admin/shoes/${id}`,
    {
      name,
      code,
      price,
      images,
      stocks,
      genderId,
      brandId,
      styleId,
      description,
    },
    config
  );
}

export async function addShoes({
  name,
  code,
  price,
  images,
  stocks,
  genderId,
  brandId,
  styleId,
  description,
}) {
  return await API.post(
    "/admin/shoes",
    {
      name,
      code,
      price,
      images,
      stocks,
      genderId,
      brandId,
      styleId,
      description,
    },
    config
  );
}

export async function deleteShoes({ ids }) {
  let query = "";
  for (let i = 0; i < ids.length; i++) {
    query += `ids=${ids[i]}`;
    query += i === ids.length - 1 ? "" : "&";
  }
  return await API.delete(`/admin/shoes?${query}`);
}
