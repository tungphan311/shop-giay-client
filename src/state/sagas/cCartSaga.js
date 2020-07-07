import { takeEvery, call, put } from "redux-saga/effects";
import {
  ACTION_ADD_PRODUCT_TO_CART,
  ACTION_GET_CART_ITEMS,
  ACTION_GET_CART_ITEMS_FAIL,
  ACTION_GET_CART_ITEMS_SUCCESS,
  ACTION_SYNC_CART,
} from "state/reducers/cCartReducer";
import {
  cGetCartItems,
  cAddProductToCart,
  cSyncCart,
} from "services/cCartService";
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
import { TOKEN_KEY, CART_KEY } from "constants/index";
import { cGetProductDetail } from "services/cProductService";

function* addProductToCart(action) {
  const token = localStorage.getItem(TOKEN_KEY);
  const { id, size, stockId } = action.payload;
  if (!token) {
    let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];

    let obj = cart.find((x) => x.stockId === stockId && x.shoesId === id);

    if (obj) obj.quantity += 1;
    else cart.push({ shoesId: id, stockId, quantity: 1 });

    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    yield call(history.push, "/cart");
    toast({ message: "Thêm thành công" });
    return;
  }

  const {
    data: { code },
  } = yield call(cAddProductToCart, { shoesId: id, sizeName: size, stockId });

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
  try {
    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) {
      const cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
      const shoesList = (yield Promise.all(
        cart.map((item) => cGetProductDetail(item.shoesId))
      )).map((x) => JSON.parse(x.data.data));
      yield put({
        type: ACTION_GET_CART_ITEMS_SUCCESS,
        payload: {
          data: cart.map((cartItem) => {
            const shoes = shoesList.find((x) => x.shoesId === cartItem.id);
            return {
              shoesId: cartItem.shoesId,
              name: shoes.name,
              stockId: cartItem.stockId,
              sizeName: shoes.sizes.find((x) => x.stockId === cartItem.stockId)
                ?.sizeName,
              quantity: cartItem.quantity,
              price: shoes.price,
              image: shoes.images[0],
            };
          }),
        },
      });

      return;
    }

    const {
      data: { code, data },
    } = yield call(cGetCartItems);

    yield put({
      type: ACTION_GET_CART_ITEMS_SUCCESS,
      payload: { data: JSON.parse(data) },
    });
  } catch (error) {
    yield put({ type: ACTION_GET_CART_ITEMS_FAIL });
    yield put({ type: ACTION_FORCE_LOGOUT });
    history.push("/login");
    toastErr("Vui lòng đăng nhập");
  }
}

function* updateCart(action) {
  const { data } = action.payload;

  const token = localStorage.getItem(TOKEN_KEY);

  let list = [];
  for (let stockId in data) {
    list.push({ stockId, quantity: data[stockId] });
  }
  if (!token) {
    let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    list.map((item) => {
      if (parseInt(item.quantity) === 0)
        cart = cart.filter((x) => JSON.stringify(x.stockId) !== item.stockId);
      else {
        let obj = cart.find((x) => JSON.stringify(x.stockId) === item.stockId);
        if (obj) {
          obj.quantity = item.quantity;
        }
      }
      // eslint-disable-next-line array-callback-return
      return;
    });
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    yield put({ type: ACTION_GET_CART_ITEMS });
    toast({ message: "Cập nhật thành công" });
    return;
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

  const token = localStorage.getItem(TOKEN_KEY);

  if (!token) {
    let cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
    cart = cart.filter((x) => x.stockId !== stockId);
    localStorage.setItem(CART_KEY, JSON.stringify(cart));

    yield put({ type: ACTION_GET_CART_ITEMS });
    toast({ message: "Cập nhật thành công" });
    return;
  }

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

function* syncCart(action) {
  const cart = JSON.parse(localStorage.getItem(CART_KEY));
  const {
    data: { code, data },
  } = yield call(cSyncCart, cart);
  switch (code) {
    case "OK":
      yield put({
        type: ACTION_GET_CART_ITEMS_SUCCESS,
        payload: { data: JSON.parse(data) },
      });
      localStorage.removeItem(CART_KEY);
      break;
    default:
    //??
  }
}

export default function* cCartSaga() {
  yield takeEvery(ACTION_ADD_PRODUCT_TO_CART, addProductToCart);
  yield takeEvery(ACTION_GET_CART_ITEMS, getCartItems);
  yield takeEvery(ACTION_UPDATE_CART, updateCart);
  yield takeEvery(ACTION_REMOVE_CART, removeCart);
  yield takeEvery(ACTION_SYNC_CART, syncCart);
}
