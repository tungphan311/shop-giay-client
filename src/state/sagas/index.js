import { all, call } from "redux-saga/effects";
import cCartSaga from "./cCartSaga";
import cProductSaga from "./cProductSaga";
import cAuthSaga from "./cAuthSaga";
import cInitSaga from "./cInitSaga";

export default function* rootSaga() {
  yield all([cCartSaga(), cProductSaga(), cAuthSaga(), cInitSaga()]);
}

export function* callAndCache(...args) {
  try {
    yield call(...args);
    // yield put(SET_CACHED_MARKER)
  } catch (error) {
    throw error;
  }
}
