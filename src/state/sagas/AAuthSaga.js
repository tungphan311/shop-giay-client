import { takeEvery, put, call, select } from "redux-saga/effects";
import { LOGIN, LOGIN_SUCCESS } from "state/reducers/AAuthReducer";
import { login } from "services/admin/authServices";
import history from "../history";
import { setStorage } from "utils/storage";
import { toast } from "utils";

export function* loginSaga({ username, password }) {
  try {
    // yield put({ type: SET_LOADING });

    const result = yield call(login, { username, password });
    const response = result.data;

    yield put({ type: LOGIN_SUCCESS, response });

    yield setStorage("identity", JSON.stringify(response.token));

    yield toast({ message: "Đăng nhập thành công" });

    yield history.push("/admin");
  } catch (err) {
    // yield toastErr(err);
  } finally {
    // yield put({ type: SET_LOADING, status: false });
  }
}

export default function* aAuthSaga() {
  yield takeEvery(LOGIN, loginSaga);
}