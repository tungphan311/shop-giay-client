import API from "utils/Axios";

export async function cLogin({ username, password }) {
  const path = "/authentication";
  const body = { username, password };
  return await API.post(path, body);
}
