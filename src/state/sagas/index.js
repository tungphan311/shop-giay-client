import { all, call } from "redux-saga/effects";
import cartSaga from "./cartSaga";
import productSaga from "./productSaga";
export default function* rootSaga() {
  yield all([cartSaga(), productSaga()]);
}

export function* callAndCache(...args) {
  try {
    yield call(...args);
    // yield put(SET_CACHED_MARKER)
  } catch (error) {
    throw error;
  }
}
