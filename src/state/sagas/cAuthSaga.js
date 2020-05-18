import { takeEvery, select, call, put } from "redux-saga/effects";
import { getFormValues } from "redux-form";
import { LOGIN_FORM_KEY } from "Components/client/CLogin/CLoginForm.js";
import { cLogin } from "services/cAuthService";
import { toastErr, toast } from "utils";
import history from "state/history";
import queryString from "query-string";
import {
  ACTION_LOGIN,
  ACTION_LOGIN_FAIL,
  ACTION_LOGIN_SUCCESS,
  ACTION_LOGOUT,
  ACTION_LOGOUT_SUCCESS,
  ACTION_VERIFY_TOKEN,
  ACTION_VERIFY_TOKEN_SUCCESS,
  ACTION_VERIFY_TOKEN_FAIl,
} from "../reducers/cAuthReducer";
import { TOKEN_KEY } from "constants/index";
import { cVerifyToken } from "../../services/cAuthService";
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

      // get user info on login success, another solution: login api return userinfo directly
      yield put({ type: ACTION_VERIFY_TOKEN });

      const parsed = queryString.parse(history.location.search);
      yield call(history.push, parsed && parsed.r ? parsed.r : "/");
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
  yield put({ type: ACTION_LOGOUT_SUCCESS });
  yield call(history.push, "/");
  yield call(toast, { message: "Đã đăng xuất" });
}

function* VerifyToken() {
  const token = localStorage.getItem(TOKEN_KEY);

  if (!token) return;

  const {
    data: { code, data },
  } = yield call(cVerifyToken, token);
  switch (code) {
    case "OK":
      yield put({
        type: ACTION_VERIFY_TOKEN_SUCCESS,
        payload: { token, userInfo: JSON.parse(data) },
      });
      break;
    default:
      yield put({
        type: ACTION_VERIFY_TOKEN_FAIl,
      });
  }
}

export default function* cAuthSaga() {
  yield takeEvery(ACTION_LOGIN, Login);
  yield takeEvery(ACTION_LOGOUT, Logout);
  yield takeEvery(ACTION_VERIFY_TOKEN, VerifyToken);
}
