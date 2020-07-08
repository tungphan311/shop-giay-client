import { takeEvery, put, call, select } from "redux-saga/effects";
import { getReportAction } from "state/actions/index";
import { SET_LOADING, SET_AUTHORIZE } from "state/reducers/aLoadingReducer";
import { getReportService } from "services/admin/reportServices";
import {
  resolvePromiseAction,
  rejectPromiseAction,
} from "@adobe/redux-saga-promise";

export function* getReportSaga(action) {
  try {
    yield put({ type: SET_LOADING });

    const token = yield select((state) => state.aAuth.token);

    const { startDate, endDate, target } = action.payload;
    const result = yield call(getReportService, {
      fromDate: startDate,
      toDate: endDate,
      target,
      token,
    });

    console.log(result);

    // const responseJSON = result.data.data;
    // const { total } = result.data;

    // const response = JSON.parse(responseJSON);

    // const res = { total, response };

    // yield call(resolvePromiseAction, action, res);
  } catch (err) {
    const {
      response: { status },
    } = err;

    if (status === 401) {
      yield put({ type: SET_AUTHORIZE, stt: false });
    }

    yield call(rejectPromiseAction, action, String(err));
  } finally {
    yield put({ type: SET_LOADING, status: false });
  }
}

export default function* aReportSaga() {
  yield takeEvery(getReportAction, getReportSaga);
}
