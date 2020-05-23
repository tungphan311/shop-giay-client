import { takeEvery, put, call, select } from "redux-saga/effects";
import { toast, toastErr } from "utils";
import { ADD_IMPORT } from "state/reducers/aImportReducer";
import { addImport } from "services/admin/importServices";

export function* addImportSaga({ providerId, details }) {
  try {
    const result = yield call(addImport, { providerId, details });
    const responseJSON = result.data.data;

    const response = JSON.parse(responseJSON);

    console.log(response);

    // yield put({ type: LOGIN_SUCCESS, response });

    yield toast({ message: result.data.msg });
  } catch (err) {
    yield toastErr(String(err));
  } finally {
    // yield put({ type: SET_LOADING, status: false });
  }
}

export default function* aImportSaga() {
  yield takeEvery(ADD_IMPORT, addImportSaga);
}
