import API from "utils/Axios";

let token = localStorage.getItem("identity");
token = token.substring(1, token.length - 1);

const config = { headers: { Authorization: `Bearer ${token}` } };

export async function getCustomerById({ id }) {
  return await API.get(`/admin/customer/${id}`, config);
}
