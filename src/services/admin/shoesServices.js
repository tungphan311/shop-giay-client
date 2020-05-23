import API from "utils/Axios";

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
  return await API.get("/color");
}

export async function addColor({ name }) {
  return await API.post("/color", { name });
}

export async function getSizes() {
  return await API.get("/size");
}

export async function addSize({ name }) {
  return await API.post("/size", { name });
}
