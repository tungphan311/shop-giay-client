import API from "utils/Axios";
import qs from "query-string";

let token = localStorage.getItem("identity") || "";
token = token.substring(1, token.length - 1);

const config = { headers: { Authorization: `Bearer ${token}` } };

export async function getCustomerService({ pageSize, page, filter }) {
  const query = qs.stringify({ "page-size": pageSize, page });
  if (!pageSize || !page) {
    return await API.get(`/admin/customer`, config);
  } else {
    if (filter) {
      let f = "";
      for (var key in filter) {
        f += `&${key}=${filter[key]}`;
      }

      return await API.get(`/admin/customer?${query}${f}`, config);
    } else {
      return await API.get(`/admin/customer?${query}`, config);
    }
  }
}

export async function getGender() {
  return await API.get("/admin/gender", config);
}
