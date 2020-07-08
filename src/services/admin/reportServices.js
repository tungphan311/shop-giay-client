import API from "utils/Axios";
import qs from "query-string";

export async function getReportService({ fromDate, toDate, target, token }) {
  const query = qs.stringify({ fromDate, toDate, target });
  return await API.get(`/admin/report?${query}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
