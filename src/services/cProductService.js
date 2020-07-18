import API from "utils/Axios";
import { TOKEN_KEY } from "constants/index";
import qs from "query-string";

export async function cGetMenNewArrivals() {
  const path = "client/shoes?page-size=6";
  const params = { new: 1, gender: "nam" };
  return await API.get(path, { params });
}

export async function cGetWomenNewArrivals() {
  const path = "client/shoes?page-size=6";
  const params = { new: 1, gender: "nữ" };
  return await API.get(path, { params });
}

export async function cGetMenProducts() {
  const path = "client/shoes?page-size=6";
  const params = { gender: "nam" };
  return await API.get(path, { params });
}

export async function cGetWomenProducts() {
  const path = "client/shoes?page-size=6";
  const params = { gender: "nữ" };
  return await API.get(path, { params });
}

export async function cGetProductDetail(id) {
  const path = `client/shoes/${id}`;
  return await API.get(path);
}

export async function cGetRelatedProducts(id) {
  const path = "client/shoes?page-size=6";
  return await API.get(path);
}
export async function cGetProductList(id) {
  const path = "client/shoes?page-size=6";
  return await API.get(path);
}
export async function cGetProductListByBrand(
  id,
  pageNumber,
  pageSize,
  style,
  size,
  gender,
  isNew,
  key
) {
  console.log(key);
  const brand = id === "Danh sách sản phẩm" ? null : id;
  const query = qs.stringify(
    {
      "page-size": pageSize,
      page: pageNumber,
      style,
      size: size || null,
      gender,
      search: key,
      brand,
    },
    { skipNull: true }
  );
  let path = `client/shoes?${query}`;
  // let params = { brand: id, page: pageNumber };
  // if (id === "Danh sách sản phẩm") {
  //   params = { page: pageNumber };
  // }
  // if (style !== "") {
  //   path = path + "&style=" + style;
  // }
  // if (size !== 0) {
  //   path = path + "&size=" + size;
  // }

  return await API.get(path);
}
export async function cGetBrandList() {
  const path = "client/brands";
  return await API.get(path);
}
export async function cGetSizeList() {
  const path = "client/sizes";
  return await API.get(path);
}
export async function cGetStyleList() {
  const path = "client/types";
  return await API.get(path);
}

export async function cRateProduct({ shoesId, rating }) {
  const path = "client/shoes/rating";
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

export async function cGetProducts({ isNew, pageSize, gender }) {
  const path = "client/shoes";
  const params = {};
  if (isNew) params.new = isNew;
  if (pageSize) params["page-size"] = pageSize;
  if (gender) params.gender = gender;
  return await API.get(path, { params });
}
