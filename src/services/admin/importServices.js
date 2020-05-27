import API from "utils/Axios";

export async function addImport({ providerId, details }) {
  return await API.post("/import", { providerId, details });
}
