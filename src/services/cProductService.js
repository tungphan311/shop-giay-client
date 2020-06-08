import API from "utils/Axios";
import { TOKEN_KEY } from "constants/index";

export async function cGetMenNewArrivals() {
  const path = "/shoes?page-size=6";
  const params = { new: 1, gender: "nam" };
  return await API.get(path, { params });
}

export async function cGetWomenNewArrivals() {
  const path = "/shoes?page-size=6";
  const params = { new: 1, gender: "nữ" };
  return await API.get(path, { params });
}

export async function cGetMenProducts() {
  const path = "/shoes?page-size=6";
  const params = { gender: "nam" };
  return await API.get(path, { params });
}

export async function cGetWomenProducts() {
  const path = "/shoes?page-size=6";
  const params = { gender: "nữ" };
  return await API.get(path, { params });
}

export async function cGetProductDetail(id) {
  const path = `/shoes/${id}`;
  return await API.get(path);
}

export async function cGetRelatedProducts(id) {
  const path = "/shoes?page-size=6";
  return await API.get(path);
}

export async function cRateProduct({ shoesId, rating }) {
  const path = "/shoes/rating";
  const token = localStorage.getItem(TOKEN_KEY);
  const AuthStr = "Bearer " + token;
  return await API.post(
    path,
    { shoesId, rating },
    {
      headers: { Authorization: AuthStr },
    }
  );
}
