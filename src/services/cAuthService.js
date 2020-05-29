import API from "utils/Axios";

export async function cLogin({ username, password }) {
  const path = "/authentication";
  const body = { username, password };
  return await API.post(path, body);
}

export async function cVerifyToken(token) {
  const path = "/customer/getInfo";
  const AuthStr = "Bearer " + token;
  return await API.get(path, {
    headers: { Authorization: AuthStr },
  });
}
