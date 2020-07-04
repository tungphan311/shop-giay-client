import API from "utils/Axios";

export async function addSale({
  saleType,
  amount,
  saleProducts,
  beginDate,
  expiredDate,
  status,
  token,
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
    { headers: { Authorization: `Bearer ${token}` } }
  );
}
