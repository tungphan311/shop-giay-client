import { takeEvery } from "redux-saga/effects";
import history from "state/history";
import { toastErr } from "utils";
export const ADD_PRODUCT_TO_CART = "CART/ADD_PRODUCT";

function* addProductToCart(action) {
  const { id, size } = action.payload;
  yield console.log(id + " " + size);
  //TODO: CALL API TO ADD PRODUCT TO CART HERE

  //redirect to login page if user is not logged in
  //const url = history.location.pathname;
  //history.push("/login?redirect=" + url);
  //toastErr("Vui lòng đăng nhập");

  //fail => display error
  //toastErr("Thêm thất bại");

  //success => redirect to cart
  //history.push("/cart");
}

export default function* cartSaga() {
  yield takeEvery(ADD_PRODUCT_TO_CART, addProductToCart);
}
