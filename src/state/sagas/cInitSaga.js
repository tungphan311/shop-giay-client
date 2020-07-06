import { takeEvery, take, put } from "redux-saga/effects";
import { ACTION_GET_INIT_DATA } from "../reducers/cInitReducer";
import {
  ACTION_VERIFY_TOKEN,
  ACTION_VERIFY_TOKEN_SUCCESS,
} from "../reducers/cAuthReducer";
import { ACTION_GET_CART_ITEMS } from "state/reducers/cCartReducer";
import { INIT_DATA } from "state/reducers/AAuthReducer";
import history from "state/history";

function* getInitData() {
  const {
    location: { pathname },
  } = history;

  if (pathname.substring(0, 7) === "/admin/") {
    const token = localStorage.getItem("identity");
    if (token) {
      yield put({ type: INIT_DATA, token });
    }
  } else {
    yield put({ type: ACTION_VERIFY_TOKEN });
    yield put({ type: ACTION_GET_CART_ITEMS });
    yield take(ACTION_VERIFY_TOKEN_SUCCESS);
    yield put({ type: ACTION_GET_CART_ITEMS });
  }
}

export default function* cInitSaga() {
  yield takeEvery(ACTION_GET_INIT_DATA, getInitData);
}
