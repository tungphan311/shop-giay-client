import { takeEvery, put, call, select } from "redux-saga/effects";
import { toast, toastErr } from "utils";
import {
  GET_SHOES,
  GET_SHOES_SUCCESS,
  GET_PROVIDERS,
  GET_PROVIDERS_SUCCESS,
  ADD_PROVIDERS,
  ADD_PROVIDERS_SUCCESS,
} from "state/reducers/AShoesReducer";
import {
  getAllShoes,
  getProviders,
  addProviders,
} from "services/admin/shoesServices";

export function* getAllShoesSaga() {
  try {
    // yield put({ type: SET_LOADING });

    const result = yield call(getAllShoes);
    const responseJSON = result.data.data;

    const response = JSON.parse(responseJSON);

    yield put({ type: GET_SHOES_SUCCESS, response });

    yield toast({ message: "Lấy danh sách giày thành công" });
  } catch (err) {
    yield toastErr(String(err));
  } finally {
    // yield put({ type: SET_LOADING, status: false });
  }
}

export function* getProvidersSaga() {
  try {
    const result = yield call(getProviders);
    const responseJSON = result.data.data;

    const response = JSON.parse(responseJSON);

    yield put({ type: GET_PROVIDERS_SUCCESS, response });
  } catch (err) {
    yield toastErr(String(err));
  }
}

export function* addProvidersSaga({ name }) {
  try {
    const result = yield call(addProviders, { name });
    const responseJSON = result.data.data;

    const response = JSON.parse(responseJSON);

    yield put({ type: ADD_PROVIDERS_SUCCESS, response });
  } catch (err) {
    yield toastErr(String(err));
  }
}

export default function* aShoesSaga() {
  yield takeEvery(GET_SHOES, getAllShoesSaga);
  yield takeEvery(GET_PROVIDERS, getProvidersSaga);
  yield takeEvery(ADD_PROVIDERS, addProvidersSaga);
}
