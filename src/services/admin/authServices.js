import API from "utils/Axios";

export async function login({ username, password }) {
  return await API.post("/admin/auth/login", { username, password });
}
