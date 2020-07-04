import API from "utils/Axios";
import qs from "query-string";

export async function getCustomerById({ id, token }) {
  return await API.get(`/admin/customer/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function getCustomerService({ pageSize, page, filter, token }) {
  const query = qs.stringify({ "page-size": pageSize, page });
  if (!pageSize || !page) {
    return await API.get(`/admin/customer`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } else {
    if (filter) {
      let f = "";
      for (var key in filter) {
        f += `&${key}=${filter[key]}`;
      }

      return await API.get(`/admin/customer?${query}${f}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      return await API.get(`/admin/customer?${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  }
}

export async function getGender({ token }) {
  return await API.get("/admin/gender", {
    headers: { Authorization: `Bearer ${token}` },
  });
}
