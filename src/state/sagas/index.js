import { all, call } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([]);
}

export function* callAndCache(...args) {
  try {
    yield call(...args);
    // yield put(SET_CACHED_MARKER)
  } catch (error) {
    throw error;
  }
}
