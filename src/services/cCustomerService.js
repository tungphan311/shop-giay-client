import API from "utils/Axios";
import { TOKEN_KEY } from "constants/index";

export async function cGetAddresses() {
  const path = "client/customer/getAddresses";
  const token = localStorage.getItem(TOKEN_KEY);
  const AuthStr = "Bearer " + token;
  return await API.get(path, { headers: { Authorization: AuthStr } });
}

export async function cAddorUpdateAddress(data) {
  const path = data.id
    ? "client/customer/update-address"
    : "client/customer/add-address";
  const token = localStorage.getItem(TOKEN_KEY);
  const AuthStr = "Bearer " + token;
  return await API.post(path, data, {
    headers: { Authorization: AuthStr },
  });
}

export async function cGetCustomerInfo() {
  const path = "client/customer/getInfo";
  const token = localStorage.getItem(TOKEN_KEY);
  const AuthStr = "Bearer " + token;
  return await API.get(path, { headers: { Authorization: AuthStr } });
}

export async function cUpdateCustomerInfo(data) {
  const path = "client/customer/updateInfo";
  const token = localStorage.getItem(TOKEN_KEY);
  const AuthStr = "Bearer " + token;
  return await API.get(path, { headers: { Authorization: AuthStr } });
}

export async function changePasswordService({ oldPassword, newPassword }) {
  const path = "client/customer/changePassword";
  const token = localStorage.getItem(TOKEN_KEY);
  const AuthStr = "Bearer " + token;
  return await API.post(
    path,
    { oldPassword, newPassword },
    { headers: { Authorization: AuthStr } }
  );
}

export async function updateService({ id, name, email, gender, phoneNumber }) {
  const path = `client/customer/${id}`;
  const token = localStorage.getItem(TOKEN_KEY);
  const AuthStr = "Bearer " + token;
  return await API.put(
    path,
    { name, email, gender, phoneNumber },
    { headers: { Authorization: AuthStr } }
  );
}
