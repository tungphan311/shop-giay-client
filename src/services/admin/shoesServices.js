import API from "utils/Axios";

export async function getAllShoes() {
  return await API.get("/shoes");
}
