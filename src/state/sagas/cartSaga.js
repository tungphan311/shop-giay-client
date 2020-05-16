import { takeEvery, call } from "redux-saga/effects";
import {
  ACTION_ADD_PRODUCT_TO_CART,
  ACTION_GET_CART_ITEMS,
} from "state/reducers/cCartReducer";
import { cGetCartItems } from "services/cCartService";
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

function* getCartItems(action) {
  const result = yield call(cGetCartItems);
  console.log(result);
}

export default function* cartSaga() {
  yield takeEvery(ACTION_ADD_PRODUCT_TO_CART, addProductToCart);
  yield takeEvery(ACTION_GET_CART_ITEMS, getCartItems);
}
