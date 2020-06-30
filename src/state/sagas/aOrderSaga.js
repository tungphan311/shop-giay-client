import { takeEvery, put, call } from "redux-saga/effects";
import { getOrderAction } from "state/actions/index";
import { SET_LOADING } from "state/reducers/aLoadingReducer";
import { getOrderService } from "services/admin/orderServices";
import {
  resolvePromiseAction,
  rejectPromiseAction,
} from "@adobe/redux-saga-promise";

export function* getOrderSaga(action) {
  try {
    yield put({ type: SET_LOADING });

    const { pageSize, page } = action.payload;
    const result = yield call(getOrderService, { pageSize, page, filter: {} });
    const responseJSON = result.data.data;
    const { total } = result.data;

    const response = JSON.parse(responseJSON);

    const res = { response, total };

    yield call(resolvePromiseAction, action, res);
  } catch (err) {
    yield call(rejectPromiseAction, action, String(err));
  } finally {
    yield put({ type: SET_LOADING, status: false });
  }
}

export default function* aOrderSaga() {
  yield takeEvery(getOrderAction, getOrderSaga);
}
