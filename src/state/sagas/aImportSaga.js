import { takeEvery, call, put } from "redux-saga/effects";
import {
  resolvePromiseAction,
  rejectPromiseAction,
} from "@adobe/redux-saga-promise";
import { addImport } from "services/admin/importServices";
import { addImportAction } from "state/actions/index";
import { SET_LOADING } from "state/reducers/aLoadingReducer";

export function* addImportSaga(action) {
  try {
    yield put({ type: SET_LOADING });
    const { providerId, details } = action.payload;

    const result = yield call(addImport, { providerId, details });
    const response = result.data;

    yield call(resolvePromiseAction, action, response.msg);
  } catch (err) {
    yield call(rejectPromiseAction, action, String(err));
  } finally {
    yield put({ type: SET_LOADING, status: false });
  }
}

export default function* aImportSaga() {
  yield takeEvery(addImportAction, addImportSaga);
}
