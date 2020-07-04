import { takeEvery, put, call, select } from "redux-saga/effects";
import {
  getOrderAction,
  updateOrderAction,
  getOrderByIdAction,
} from "state/actions/index";
import { SET_LOADING, SET_AUTHORIZE } from "state/reducers/aLoadingReducer";
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
    const token = yield select((state) => state.aAuth.token);

    const { pageSize, page } = action.payload;
    const result = yield call(getOrderService, {
      pageSize,
      page,
      filter: {},
      token,
    });
    const responseJSON = result.data.data;
    const { total } = result.data;

    const response = JSON.parse(responseJSON);

    const res = { response, total };

    yield call(resolvePromiseAction, action, res);
  } catch (err) {
    const {
      response: { status },
    } = err;

    if (status === 401) {
      yield put({ type: SET_AUTHORIZE, stt: false });
    }

    yield call(rejectPromiseAction, action, String(err));
  } finally {
    yield put({ type: SET_LOADING, status: false });
  }
}

export function* getOrderByIdSaga(action) {
  try {
    yield put({ type: SET_LOADING });
    const token = yield select((state) => state.aAuth.token);

    const { id } = action.payload;
    const result = yield call(getOrderByIdService, {
      id,
      token,
    });

    const responseJSON = result.data.data;
    const response = JSON.parse(responseJSON);

    yield call(resolvePromiseAction, action, response);
  } catch (err) {
    const {
      response: { status },
    } = err;

    if (status === 401) {
      yield put({ type: SET_AUTHORIZE, stt: false });
    }

    yield call(rejectPromiseAction, action, String(err));
  } finally {
    yield put({ type: SET_LOADING, status: false });
  }
}

export function* updateOrderSaga(action) {
  try {
    yield put({ type: SET_LOADING });
    const token = yield select((state) => state.aAuth.token);

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
      token,
    });
    const responseJSON = result.data.data;
    const response = JSON.parse(responseJSON);

    yield call(resolvePromiseAction, action, response);
  } catch (err) {
    const {
      response: { status },
    } = err;

    if (status === 401) {
      yield call(
        rejectPromiseAction,
        action,
        "Bạn không có quyền để thực hiện chức năng này"
      );
    } else {
      yield call(rejectPromiseAction, action, String(err));
    }
  } finally {
    yield put({ type: SET_LOADING, status: false });
  }
}

export default function* aOrderSaga() {
  yield takeEvery(getOrderAction, getOrderSaga);
  yield takeEvery(getOrderByIdAction, getOrderByIdSaga);
  yield takeEvery(updateOrderAction, updateOrderSaga);
}
