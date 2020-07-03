import { takeEvery, put, call } from "redux-saga/effects";
import {
  getOrderAction,
  updateOrderAction,
  getOrderByIdAction,
} from "state/actions/index";
import { SET_LOADING } from "state/reducers/aLoadingReducer";
import {
  getOrderService,
  updateOrderService,
  getOrderByIdService,
} from "services/admin/orderServices";
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

export function* getOrderByIdSaga(action) {
  try {
    yield put({ type: SET_LOADING });

    const { id } = action.payload;
    const result = yield call(getOrderByIdService, {
      id,
    });

    const responseJSON = result.data.data;
    const response = JSON.parse(responseJSON);

    yield call(resolvePromiseAction, action, response);
  } catch (err) {
    yield call(rejectPromiseAction, action, String(err));
  } finally {
    yield put({ type: SET_LOADING, status: false });
  }
}

export function* updateOrderSaga(action) {
  try {
    yield put({ type: SET_LOADING });

    const {
      id,
      status,
      deliveryDate,
      beginDelivery,
      cancelDate,
      confirmDate,
      note,
    } = action.payload;

    const result = yield call(updateOrderService, {
      id,
      status,
      deliveryDate,
      beginDelivery,
      cancelDate,
      confirmDate,
      note,
    });
    const responseJSON = result.data.data;
    const response = JSON.parse(responseJSON);

    yield call(resolvePromiseAction, action, response);
  } catch (err) {
    yield call(rejectPromiseAction, action, String(err));
  } finally {
    yield put({ type: SET_LOADING, status: false });
  }
}

export default function* aOrderSaga() {
  yield takeEvery(getOrderAction, getOrderSaga);
  yield takeEvery(getOrderByIdAction, getOrderByIdSaga);
  yield takeEvery(updateOrderAction, updateOrderSaga);
}
