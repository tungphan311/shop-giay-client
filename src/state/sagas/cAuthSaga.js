import { takeEvery, select, call, put } from "redux-saga/effects";
import { getFormValues } from "redux-form";
import { LOGIN_FORM_KEY } from "Components/client/CLogin/CLoginForm.js";
import { cLogin } from "services/cAuthService";
import { toastErr, toast } from "utils";
import history from "state/history";
import {
  ACTION_LOGIN,
  ACTION_LOGIN_FAIL,
  ACTION_LOGIN_SUCCESS,
  ACTION_LOGOUT,
  ACTION_LOGOUT_SUCCESS,
} from "../reducers/cAuthReducer";
function* Login(action) {
  const { username, password } = yield select((state) =>
    getFormValues(LOGIN_FORM_KEY)(state)
  );
  const { data: { code, data, msg } = {} } = yield call(cLogin, {
    username,
    password,
  });
  switch (code) {
    case "200":
      const { token } = data.match(/^AuthorizedToken: (?<token>.*)/).groups;
      yield put({
        type: ACTION_LOGIN_SUCCESS,
        payload: {
          username: username,
          token: token,
        },
      });
      yield call(history.push, "/");
      yield call(toast, { message: "Đăng nhập thành công" });
      break;
    case "403":
      yield put({ type: ACTION_LOGIN_FAIL });
      yield call(toastErr, msg);
      break;
    default:
      yield put({ type: ACTION_LOGIN_FAIL });
      yield call(toastErr, "Lỗi không xác định");
  }
}

function* Logout(action) {
  console.log("Test");
  yield put({ type: ACTION_LOGOUT_SUCCESS });
  yield call(history.push, "/");
  yield call(toast, { message: "Đã đăng xuất" });
}

export default function* cAuthSaga() {
  yield takeEvery(ACTION_LOGIN, Login);
  yield takeEvery(ACTION_LOGOUT, Logout);
}
