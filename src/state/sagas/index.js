import { all, call } from "redux-saga/effects";
import cCartSaga from "./cCartSaga";
import cProductSaga from "./cProductSaga";
import cAuthSaga from "./cAuthSaga";
import cInitSaga from "./cInitSaga";
import aAuthSaga from "./AAuthSaga";
import aShoesSaga from "state/sagas/AShoesSaga";
import aImportSaga from "state/sagas/aImportSaga";

export default function* rootSaga() {
  yield all([
    cCartSaga(),
    cProductSaga(),
    cAuthSaga(),
    cInitSaga(),
    aAuthSaga(),
    aShoesSaga(),
    aImportSaga(),
  ]);
}

export function* callAndCache(...args) {
  try {
    yield call(...args);
    // yield put(SET_CACHED_MARKER)
  } catch (error) {
    throw error;
  }
}
