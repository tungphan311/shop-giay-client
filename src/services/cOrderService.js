import Axios from "axios";
import API from "utils/Axios";
import { TOKEN_KEY } from "constants/index";
//for development use
const baseURL = "http://thongtindoanhnghiep.co/api";

export async function cGetCityList() {
  const path = "/city";
  return Axios({ method: "get", url: baseURL + path });
}

export async function cGetDistrictList(id) {
  const path = `/city/${id}/district`;
  return Axios({ method: "get", url: baseURL + path });
}

export async function cGetWardList(id) {
  const path = `/district/${id}/ward`;
  return Axios({ method: "get", url: baseURL + path });
}

export async function cPlaceOrder({ id }) {
  const path = "client/order?addressId=" + id;
  const token = localStorage.getItem(TOKEN_KEY);
  const AuthStr = "Bearer " + token;
  return await API.post(
    path,
    {},
    {
      headers: { Authorization: AuthStr },
    }
  );
}

export async function cGetOrder({ page = 1, pageSize = 10 }) {
  const path = `client/order/list?page=${page}&pageSize=${pageSize}`;
  const token = localStorage.getItem(TOKEN_KEY);
  const AuthStr = "Bearer " + token;
  return await API.get(path, {
    headers: { Authorization: AuthStr },
  });
}

export async function cGetOrderDetail(id) {
  const path = "client/order/" + id;
  const token = localStorage.getItem(TOKEN_KEY);
  const AuthStr = "Bearer " + token;
  return await API.get(path, {
    headers: { Authorization: AuthStr },
  });
}
