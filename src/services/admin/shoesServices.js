import API from "utils/Axios";
import EditShoes from "pages/Admin/EditShoes/EditShoes";

export async function getAllShoes() {
  return await API.get("/shoes");
}

export async function getProviders() {
  return await API.get("/provider");
}

export async function addProviders({ name }) {
  return await API.post("/provider", { name });
}

export async function getColors() {
  return await API.get("/admin/color");
}

export async function addColor({ name }) {
  return await API.post("/color", { name });
}

export async function getSizes() {
  return await API.get("admin/size");
}

export async function addSize({ name }) {
  return await API.post("/size", { name });
}

export async function getGenders() {
  return await API.get("/admin/gender");
}

export async function getShoesType() {
  return await API.get("/admin/shoestype");
}

export async function getShoesBrand() {
  return await API.get("/admin/shoesbrand");
}

export async function getShoesById({ id }) {
  return await API.get(`/admin/shoes/${id}`);
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
  return await API.put(`/admin/shoes/${id}`, {
    name,
    code,
    price,
    images,
    stocks,
    genderId,
    brandId,
    styleId,
    description,
  });
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
  return await API.post("admin/shoes", {
    name,
    code,
    price,
    images,
    stocks,
    genderId,
    brandId,
    styleId,
    description,
  });
}
