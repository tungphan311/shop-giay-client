import { takeEvery, call, put } from "redux-saga/effects";
import {
  ACTION_ADD_PRODUCT_TO_CART,
  ACTION_GET_CART_ITEMS,
  ACTION_GET_CART_ITEMS_FAIL,
  ACTION_GET_CART_ITEMS_SUCCESS,
} from "state/reducers/cCartReducer";
import { cGetCartItems } from "services/cCartService";
import history from "state/history";
import { toastErr } from "utils";
import { ACTION_FORCE_LOGOUT } from "../reducers/cAuthReducer";
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
  const {
    data: { code, data, msg },
  } = yield call(cGetCartItems);

  switch (code) {
    case "OK":
      yield put({
        type: ACTION_GET_CART_ITEMS_SUCCESS,
        payload: { data: JSON.parse(data) },
      });
      break;
    default:
      yield put({ type: ACTION_GET_CART_ITEMS_FAIL });
      yield put({ type: ACTION_FORCE_LOGOUT });
      history.push("/login");
      toastErr("Vui lòng đăng nhập lại");
  }
}

export default function* cCartSaga() {
  yield takeEvery(ACTION_ADD_PRODUCT_TO_CART, addProductToCart);
  yield takeEvery(ACTION_GET_CART_ITEMS, getCartItems);
}
