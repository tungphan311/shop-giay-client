import API from "utils/Axios";
let token = localStorage.getItem("identity") || "";
token = token.substring(1, token.length - 1);

const config = { headers: { Authorization: `Bearer ${token}` } };

export async function addSale({
  saleType,
  amount,
  saleProducts,
  beginDate,
  expiredDate,
  status,
}) {
  return await API.post(
    `/admin/sale`,
    {
      saleType,
      amount,
      saleProducts,
      beginDate,
      expiredDate,
      status,
    },
    config
  );
}

export async function deleteShoes({ ids }) {
  let query = "";
  for (let i = 0; i < ids.length; i++) {
    query += `ids=${ids[i]}`;
    query += i === ids.length - 1 ? "" : "&";
  }
  return await API.delete(`/admin/shoes?${query}`);
}
