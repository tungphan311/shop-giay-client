import API from "utils/Axios";

export async function cGetMenNewArrivals() {
  const path = "/shoes";
  const params = { new: 1, gender: "nam" };
  return await API.get(path, { params });
}

export async function cGetWomenNewArrivals() {
  const path = "/shoes";
  const params = { new: 1, gender: "nữ" };
  return await API.get(path, { params });
}

export async function cGetMenProducts() {
  const path = "/shoes";
  const params = { gender: "nam" };
  return await API.get(path, { params });
}

export async function cGetWomenProducts() {
  const path = "/shoes";
  const params = { gender: "nữ" };
  return await API.get(path, { params });
}

export async function cGetProductDetail(id) {
  const path = `/shoes/${id}`;
  return await API.get(path);
}

export async function cGetRelatedProducts(id) {
  const path = "/shoes";
  return await API.get(path);
}
