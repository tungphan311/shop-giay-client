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
