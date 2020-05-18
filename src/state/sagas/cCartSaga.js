import { takeEvery, call, put } from "redux-saga/effects";
import {
  ACTION_ADD_PRODUCT_TO_CART,
  ACTION_GET_CART_ITEMS,
  ACTION_GET_CART_ITEMS_FAIL,
  ACTION_GET_CART_ITEMS_SUCCESS,
} from "state/reducers/cCartReducer";
import { cGetCartItems, cAddProductToCart } from "services/cCartService";
import history from "state/history";
import { toastErr, toast } from "utils";
import { ACTION_FORCE_LOGOUT } from "../reducers/cAuthReducer";
import {
  ACTION_UPDATE_CART,
  ACTION_UPDATE_CART_FAIL,
  ACTION_UPDATE_CART_SUCCESS,
  ACTION_REMOVE_CART,
} from "../reducers/cCartReducer";
import { cUpdateCart, cRemoveCart } from "../../services/cCartService";
function* addProductToCart(action) {
  const { id, size } = action.payload;
  const {
    data: { code },
  } = yield call(cAddProductToCart, { shoesId: id, sizeName: size });

  switch (code) {
    case "OK":
      yield call(history.push, "/cart");
      toast({ message: "Thêm thành công" });
      break;
    default:
      yield put({ type: ACTION_FORCE_LOGOUT });
      yield call(history.push, "/login");
      toastErr("Vui lòng đăng nhập lại");
  }
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
      toastErr("Vui lòng đăng nhập");
  }
}

function* updateCart(action) {
  const { data } = action.payload;
  let list = [];
  for (let stockId in data) {
    list.push({ stockId, quantity: data[stockId] });
  }

  const {
    data: { code, data: newData },
  } = yield call(cUpdateCart, list);
  switch (code) {
    case "OK":
      yield put({
        type: ACTION_UPDATE_CART_SUCCESS,
        payload: { data: JSON.parse(newData) },
      });
      toast({ message: "Cập nhật thành công" });
      break;
    default:
      yield put({ type: ACTION_UPDATE_CART_FAIL });
      yield put({ type: ACTION_FORCE_LOGOUT });
      yield call(history.push, "/login");
      toastErr("Vui lòng đăng nhập lại");
  }
}

function* removeCart(action) {
  const { stockId } = action.payload;

  const {
    data: { code, data: newData },
  } = yield call(cRemoveCart, stockId);
  switch (code) {
    case "OK":
      yield put({
        type: ACTION_UPDATE_CART_SUCCESS,
        payload: { data: JSON.parse(newData) },
      });
      toast({ message: "Xóa sản phẩm thành công" });
      break;
    default:
      yield put({ type: ACTION_UPDATE_CART_FAIL });
      yield put({ type: ACTION_FORCE_LOGOUT });
      yield call(history.push, "/login");
      toastErr("Vui lòng đăng nhập lại");
  }
}

export default function* cCartSaga() {
  yield takeEvery(ACTION_ADD_PRODUCT_TO_CART, addProductToCart);
  yield takeEvery(ACTION_GET_CART_ITEMS, getCartItems);
  yield takeEvery(ACTION_UPDATE_CART, updateCart);
  yield takeEvery(ACTION_REMOVE_CART, removeCart);
}
