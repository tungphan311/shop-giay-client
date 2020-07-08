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
  try {
    const {
      data: { data },
    } = yield cGetAddresses();

    yield put({
      type: ACTION_GET_ADDRESSES_SUCCESS,
      payload: { data: JSON.parse(data) },
    });
  } catch (err) {
    yield put({ type: ACTION_GET_ADDRESSES_FAIL });
    yield history.push("/login");
    yield toastErr(err);
  }
}

function* updateAddress() {
  try {
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
      data: { data },
    } = yield cAddorUpdateAddress({
      id,
      name: fullName,
      phoneNumber,
      city: city.label,
      district: district.label,
      ward: ward.label,
      street,
    });
    yield put({
      type: ACTION_GET_ADDRESSES_SUCCESS,
      payload: { data: JSON.parse(data) },
    });
    yield put({ type: ACTION_HIDE_ADDRESS_FORM });
  } catch (err) {
    yield put({ type: ACTION_HIDE_ADDRESS_FORM });
    yield put({ type: ACTION_FORCE_LOGOUT });
    yield toastErr(err);
    history.push("/login");
  }
}

export default function* cCustomerSaga() {
  yield takeEvery(ACTION_GET_ADDRESSES, getAddresses);
  yield takeEvery(ACTION_UPDATE_ADDRESS, updateAddress);
}
