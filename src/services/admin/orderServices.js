import API from "utils/Axios";
import qs from "query-string";

export async function getOrderService({ page, pageSize, filter, token }) {
  const query = qs.stringify({ "page-size": pageSize, page });
  if (!pageSize || !page) {
    return await API.get(`/admin/order`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } else {
    if (filter) {
      let f = "";
      for (var key in filter) {
        f += `&${key}=${filter[key]}`;
      }

      return await API.get(`/admin/order?${query}${f}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      return await API.get(`/admin/order?${query}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  }
}

export async function getOrderByIdService({ id, token }) {
  return await API.get(`/admin/order/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function updateOrderService({
  id,
  status,
  deliveryDate,
  beginDelivery,
  cancelDate,
  confirmDate,
  note,
  token,
}) {
  return await API.put(
    `/admin/order/${id}`,
    { id, status, deliveryDate, beginDelivery, cancelDate, confirmDate, note },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}
