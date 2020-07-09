import { all, call } from "redux-saga/effects";
import cCartSaga from "./cCartSaga";
import cProductSaga from "./cProductSaga";
import cAuthSaga from "./cAuthSaga";
import cInitSaga from "./cInitSaga";
import aAuthSaga from "./AAuthSaga";
import aShoesSaga from "state/sagas/AShoesSaga";
import aImportSaga from "state/sagas/aImportSaga";
import cOrderSaga from "./cOrderSaga";
import cCustomerSaga from "./cCustomerSaga";
import aCustomerSaga from "./ACustomerSaga";
import aOrderSaga from "./aOrderSaga";
import aSaleSaga from "./ASaleSaga";
import aAccountSaga from "./AAccountSaga";

export default function* rootSaga() {
  yield all([
    aCustomerSaga(),
    cCartSaga(),
    cProductSaga(),
    cAuthSaga(),
    cInitSaga(),
    aAuthSaga(),
    aShoesSaga(),
    aImportSaga(),
    cOrderSaga(),
    cCustomerSaga(),
    aOrderSaga(),
    aSaleSaga(),
    aAccountSaga(),
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
