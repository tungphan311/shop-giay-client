import API from "utils/Axios";

export async function getMenNewArrivals() {
  const path = "/shoes";
  const params = { new: 1, gender: "nam" };
  return await API.get(path, { params });
}

export async function getWomenNewArrivals() {
  const path = "/shoes";
  const params = { new: 1, gender: "nữ" };
  return await API.get(path, { params });
}

export async function getMenProducts() {
  const path = "/shoes";
  const params = { gender: "nam" };
  return await API.get(path, { params });
}

export async function getWomenProducts() {
  const path = "/shoes";
  const params = { gender: "nữ" };
  return await API.get(path, { params });
}
