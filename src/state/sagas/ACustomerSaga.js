import { takeEvery, put, call, select } from "redux-saga/effects";
import { getCustomerAction, getGenderAction } from "state/actions/index";
import { SET_LOADING } from "state/reducers/aLoadingReducer";
import { getCustomerService, getGender } from "services/admin/customerServices";
import {
  resolvePromiseAction,
  rejectPromiseAction,
} from "@adobe/redux-saga-promise";
import {
  GET_CUSTOMER_SUCCESS,
  GET_GENDER,
  GET_GENDER_SUCCESS,
} from "state/reducers/aCustomerReducer";
import { toastErr } from "utils/index";

export function* getCustomerSaga(action) {
  try {
    yield put({ type: SET_LOADING });

    const { pageSize, page, filter } = action.payload;
    const result = yield call(getCustomerService, {
      pageSize,
      page,
      filter,
    });
    const responseJSON = result.data.data;
    const { total } = result.data;

    const response = JSON.parse(responseJSON);

    yield put({ type: GET_CUSTOMER_SUCCESS, response, total });

    yield call(resolvePromiseAction, action, response);
  } catch (err) {
    yield call(rejectPromiseAction, action, String(err));
  } finally {
    yield put({ type: SET_LOADING, status: false });
  }
}

export function* getGenderSaga(action) {
  try {
    const result = yield call(getGender);
    const responseJSON = result.data.data;

    let response = JSON.parse(responseJSON);
    response = response.map((g) => ({ name: g.Name, id: g.Id }));

    yield call(resolvePromiseAction, action, response);
  } catch (err) {
    yield call(rejectPromiseAction, action, String(err));
  }
}

export default function* aCustomerSaga() {
  yield takeEvery(getCustomerAction, getCustomerSaga);
  yield takeEvery(getGenderAction, getGenderSaga);
}
