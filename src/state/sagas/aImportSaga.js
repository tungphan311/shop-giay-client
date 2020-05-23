import { takeEvery, put, call, select } from "redux-saga/effects";
import {
  resolvePromiseAction,
  rejectPromiseAction,
} from "@adobe/redux-saga-promise";
import { toast, toastErr } from "utils";
import { addImport } from "services/admin/importServices";
import { addImportAction } from "state/actions/index";

export function* addImportSaga(action) {
  try {
    const { providerId, details } = action.payload;

    const result = yield call(addImport, { providerId, details });
    const response = result.data;

    yield call(resolvePromiseAction, action, response.msg);
  } catch (err) {
    yield call(rejectPromiseAction, action, String(err));
  }
}

export default function* aImportSaga() {
  yield takeEvery(addImportAction, addImportSaga);
}
