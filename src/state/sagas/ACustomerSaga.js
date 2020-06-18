import { takeEvery, put, call, select } from "redux-saga/effects";
import { toast, toastErr } from "utils";

import {
  GET_CUSTOMER_BY_ID,
  GET_CUSTOMER_BY_ID_SUCCESS,
} from "state/reducers/ACustomerReducer";

import { getCustomerById } from "services/admin/customerServices";

export function* getCustomerByIdSaga({ id }) {
  try {
    const result = yield call(getCustomerById, { id });
    const responseJSON = result.data.data;
    const response = JSON.parse(responseJSON);
    yield put({ type: GET_CUSTOMER_BY_ID_SUCCESS, response });
  } catch (err) {
    yield toastErr(err);
  }
}

export default function* aCustomerSaga() {
  yield takeEvery(GET_CUSTOMER_BY_ID, getCustomerByIdSaga);
}
