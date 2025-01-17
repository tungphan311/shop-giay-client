import { takeEvery, put, call, select } from "redux-saga/effects";
import { getCustomerAction, getGenderAction } from "state/actions/index";
import { SET_LOADING, SET_AUTHORIZE } from "state/reducers/aLoadingReducer";
import {
  getCustomerService,
  getGender,
  getCustomerById,
} from "services/admin/customerServices";
import {
  resolvePromiseAction,
  rejectPromiseAction,
} from "@adobe/redux-saga-promise";
import {
  GET_CUSTOMER_SUCCESS,
  GET_CUSTOMER_BY_ID,
  GET_CUSTOMER_BY_ID_SUCCESS,
} from "state/reducers/ACustomerReducer";

export function* getCustomerSaga(action) {
  try {
    yield put({ type: SET_LOADING });

    const token = yield select((state) => state.aAuth.token);

    const { pageSize, page, filter } = action.payload;
    const result = yield call(getCustomerService, {
      pageSize,
      page,
      filter,
      token,
    });
    const responseJSON = result.data.data;
    const { total } = result.data;

    const response = JSON.parse(responseJSON);

    yield put({ type: GET_CUSTOMER_SUCCESS, response, total });

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

export function* getGenderSaga(action) {
  try {
    const token = yield select((state) => state.aAuth.token);

    const result = yield call(getGender, { token });
    const responseJSON = result.data.data;

    let response = JSON.parse(responseJSON);
    response = response.map((g) => ({ name: g.Name, id: g.Id }));

    yield call(resolvePromiseAction, action, response);
  } catch (err) {
    const {
      response: { status },
    } = err;

    if (status === 401) {
      yield put({ type: SET_AUTHORIZE, stt: false });
    }

    yield call(rejectPromiseAction, action, String(err));
  }
}

export function* getCustomerByIdSaga({ id }) {
  try {
    yield put({ type: SET_LOADING });
    const token = yield select((state) => state.aAuth.token);

    const result = yield call(getCustomerById, { id, token });
    const responseJSON = result.data.data;
    const response = JSON.parse(responseJSON);
    yield put({ type: GET_CUSTOMER_BY_ID_SUCCESS, response });
  } catch (err) {
    const {
      response: { status },
    } = err;

    if (status === 401) {
      yield put({ type: SET_AUTHORIZE, stt: false });
    }
  } finally {
    yield put({ type: SET_LOADING, status: false });
  }
}

export default function* aCustomerSaga() {
  yield takeEvery(getCustomerAction, getCustomerSaga);
  yield takeEvery(getGenderAction, getGenderSaga);
  yield takeEvery(GET_CUSTOMER_BY_ID, getCustomerByIdSaga);
}
