import API from "utils/Axios";
import { TOKEN_KEY } from "constants/index";

export async function cGetAddresses() {
  const path = "client/customer/getAddresses";
  const token = localStorage.getItem(TOKEN_KEY);
  const AuthStr = "Bearer " + token;
  return await API.get(path, { headers: { Authorization: AuthStr } });
}

export async function cAddorUpdateAddress(data) {
  const path = data.id ? "client/customer/update-address" : "client/customer/add-address";
  const token = localStorage.getItem(TOKEN_KEY);
  const AuthStr = "Bearer " + token;
  return await API.post(path, data, {
    headers: { Authorization: AuthStr },
  });
}
