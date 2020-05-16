import API from "utils/Axios";
import { TOKEN_KEY } from "constants/index";

export async function cGetCartItems() {
  const path = "/cart/get";
  const token = localStorage.getItem(TOKEN_KEY);
  const AuthStr = "Bearer " + token;
  return await API.get(path, { headers: { Authorization: AuthStr } });
}

export async function cAddProductToCart({ shoesId, sizeName }) {
  const path = "/cart/add";
  const token = localStorage.getItem(TOKEN_KEY);
  const AuthStr = "Bearer " + token;
  return await API.post(
    path,
    { shoesId, sizeName, quantity: 1 },
    {
      headers: { Authorization: AuthStr },
    }
  );
}
