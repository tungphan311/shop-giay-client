import { takeEvery, put } from "redux-saga/effects";
import { ACTION_GET_INIT_DATA } from "../reducers/cInitReducer";
import { ACTION_VERIFY_TOKEN } from "../reducers/cAuthReducer";

function* getInitData() {
  yield put({ type: ACTION_VERIFY_TOKEN });
}

export default function* cInitSaga() {
  yield takeEvery(ACTION_GET_INIT_DATA, getInitData);
}
