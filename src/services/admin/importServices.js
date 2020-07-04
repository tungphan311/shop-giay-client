import API from "utils/Axios";

export async function addImport({ providerId, details, token }) {
  return await API.post(
    "/admin/import",
    { providerId, details },
    { headers: { Authorization: `Bearer ${token}` } }
  );
}
