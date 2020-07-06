import API from "utils/Axios";
import qs from "query-string";

export async function getProviderServices({ pageSize, page, token }) {
  const query = qs.stringify({ "page-size": pageSize, page });
  if (!pageSize || !page) {
    return await API.get(`/admin/provider`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } else {
    return await API.get(`/admin/provider?${query}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export async function deleteProviderService({ ids, token }) {
  let query = "";
  for (let i = 0; i < ids.length; i++) {
    query += `ids=${ids[i]}`;
    query += i === ids.length - 1 ? "" : "&";
  }
  return await API.delete(`/admin/provider?${query}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}