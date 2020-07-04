import API from "utils/Axios";
import qs from "query-string";

let token = localStorage.getItem("identity") || "";
token = token.substring(1, token.length - 1);

const config = { headers: { Authorization: `Bearer ${token}` } };

export async function getOrderService({ page, pageSize, filter }) {
  const query = qs.stringify({ "page-size": pageSize, page });
  if (!pageSize || !page) {
    return await API.get(`/admin/order`, config);
  } else {
    if (filter) {
      let f = "";
      for (var key in filter) {
        f += `&${key}=${filter[key]}`;
      }

      return await API.get(`/admin/order?${query}${f}`, config);
    } else {
      return await API.get(`/admin/order?${query}`, config);
    }
  }
}

export async function getOrderByIdService({ id }) {
  return await API.get(`/admin/order/${id}`, config);
}

export async function updateOrderService({
  id,
  status,
  deliveryDate,
  beginDelivery,
  cancelDate,
  confirmDate,
  note,
}) {
  return await API.put(
    `/admin/order/${id}`,
    { id, status, deliveryDate, beginDelivery, cancelDate, confirmDate, note },
    config
  );
}
