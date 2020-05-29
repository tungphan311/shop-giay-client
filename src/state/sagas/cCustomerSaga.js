import {
  ACTION_GET_ADDRESSES,
  ACTION_GET_ADDRESSES_SUCCESS,
  ACTION_GET_ADDRESSES_FAIL,
  ACTION_UPDATE_ADDRESS,
  ACTION_HIDE_ADDRESS_FORM,
} from "state/reducers/cCustomerReducer";
import { takeEvery, put, select } from "redux-saga/effects";
import { cGetAddresses } from "services/cCustomerService";
import history from "state/history";
import { toastErr } from "utils";
import { getFormValues } from "redux-form";
import { ADDRESS_FORM_KEY } from "Components/client/CAddressForm/index";
import { cAddorUpdateAddress } from "services/cCustomerService";
import { ACTION_FORCE_LOGOUT } from "../reducers/cAuthReducer";

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

function* updateAddress() {
  const {
    id,
    fullName,
    phoneNumber,
    city,
    district,
    ward,
    street,
  } = yield select((state) => getFormValues(ADDRESS_FORM_KEY)(state));

  const {
    data: { code, data },
  } = yield cAddorUpdateAddress({
    id,
    name: fullName,
    phoneNumber,
    city: city.label,
    district: district.label,
    ward: ward.label,
    street,
  });
  switch (code) {
    case "OK":
      yield put({
        type: ACTION_GET_ADDRESSES_SUCCESS,
        payload: { data: JSON.parse(data) },
      });
      yield put({ type: ACTION_HIDE_ADDRESS_FORM });
      break;
    default:
      yield put({ type: ACTION_HIDE_ADDRESS_FORM });
      yield put({ type: ACTION_FORCE_LOGOUT });
      toastErr("Vui lòng đăng nhập");
      history.push("/login");
  }
}

export default function* cCustomerSaga() {
  yield takeEvery(ACTION_GET_ADDRESSES, getAddresses);
  yield takeEvery(ACTION_UPDATE_ADDRESS, updateAddress);
}
