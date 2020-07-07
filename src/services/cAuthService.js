import API from "utils/Axios";

export async function cLogin({ username, password }) {
  const path = "client/authentication";
  const body = { username, password };
  return await API.post(path, body);
}

export async function cVerifyToken(token) {
  const path = "client/customer/getInfo";
  const AuthStr = "Bearer " + token;
  return await API.get(path, {
    headers: { Authorization: AuthStr },
  });
}

export async function cRegister({
  username,
  password,
  name,
  dateOfBirth,
  gender,
  email,
  phoneNumber,
}) {
  const path = "client/authentication/register";
  const body = {
    username,
    password,
    name,
    dateOfBirth,
    gender,
    email,
    phoneNumber,
  };

  return await API.post(path, body);
}
