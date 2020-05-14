import { all, call } from "redux-saga/effects";
import cartSaga from "./cartSaga";

export default function* rootSaga() {
  yield all([cartSaga()]);
}

export function* callAndCache(...args) {
  try {
    yield call(...args);
    // yield put(SET_CACHED_MARKER)
  } catch (error) {
    throw error;
  }
}
