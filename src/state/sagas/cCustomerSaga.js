import {
  ACTION_GET_ADDRESSES,
  ACTION_GET_ADDRESSES_SUCCESS,
  ACTION_GET_ADDRESSES_FAIL,
} from "state/reducers/cCustomerReducer";
import { takeEvery, put } from "redux-saga/effects";
import { cGetAddresses } from "services/cCustomerService";
import history from "state/history";
import { toastErr } from "utils";

function* getAddresses() {
  const {
    data: { code, data },
  } = yield cGetAddresses();
  switch (code) {
    case "OK":
      yield put({
        type: ACTION_GET_ADDRESSES_SUCCESS,
        payload: { data: JSON.parse(data) },
      });
      break;
    default:
      yield put({ type: ACTION_GET_ADDRESSES_FAIL });
      yield history.push("/login");
      yield toastErr("Vui lòng đăng nhập lại");
  }
}

export default function* cCustomerSaga() {
  yield takeEvery(ACTION_GET_ADDRESSES, getAddresses);
}
