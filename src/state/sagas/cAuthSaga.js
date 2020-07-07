import { takeEvery, select, call, put } from "redux-saga/effects";
import { getFormValues } from "redux-form";
import { LOGIN_FORM_KEY } from "Components/client/CLogin/CLoginForm.js";
import { cLogin, cRegister } from "services/cAuthService";
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
  ACTION_SIGNUP,
} from "../reducers/cAuthReducer";
import { TOKEN_KEY, CART_KEY } from "constants/index";
import { cVerifyToken } from "../../services/cAuthService";
import {
  ACTION_CLEAR_CART,
  ACTION_GET_CART_ITEMS,
  ACTION_SYNC_CART,
} from "state/reducers/cCartReducer";
import { SIGNUP_FORM_KEY } from "Components/client/CSignUp/CSignUpForm";

function* Login(action) {
  try {
    const { username, password } = yield select((state) =>
      getFormValues(LOGIN_FORM_KEY)(state)
    );
    const { data: { code, data, msg } = {} } = yield call(cLogin, {
      username,
      password,
    });
    switch (code) {
      case "200":
        yield put({
          type: ACTION_LOGIN_SUCCESS,
          payload: {
            username: username,
            data: JSON.parse(data),
          },
        });

        // sync if local cart is not null
        const cart = JSON.parse(localStorage.getItem(CART_KEY)) || [];
        if (cart.length > 0) {
          yield put({ type: ACTION_SYNC_CART });
        } else yield put({ type: ACTION_GET_CART_ITEMS });

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
  } catch (err) {
    yield put({ type: ACTION_LOGIN_FAIL });
    yield call(toastErr, err);
  }
}

function* Signup(action) {
  try {
    let {
      username,
      password,
      name,
      dateOfBirth,
      gender,
      email,
      phoneNumber,
    } = yield select((state) => getFormValues(SIGNUP_FORM_KEY)(state));
    dateOfBirth = dateOfBirth.split("/");

    dateOfBirth = new Date(
      parseInt(dateOfBirth[2]),
      parseInt(dateOfBirth[1]),
      parseInt(dateOfBirth[0])
    ).toISOString();

    const result = yield call(cRegister, {
      username,
      password,
      name,
      dateOfBirth,
      gender,
      email,
      phoneNumber,
    });

    console.log(result);
  } catch (error) {
    toastErr(error);
  }
}

function* Logout(action) {
  yield put({ type: ACTION_LOGOUT_SUCCESS });
  yield put({ type: ACTION_CLEAR_CART });
  yield call(history.push, "/");
  yield call(toast, { message: "Đã đăng xuất" });
}

function* VerifyToken() {
  try {
    const token = localStorage.getItem(TOKEN_KEY);

    if (!token) return;

    const {
      data: { data },
    } = yield call(cVerifyToken, token);

    yield put({
      type: ACTION_VERIFY_TOKEN_SUCCESS,
      payload: { token, userInfo: JSON.parse(data) },
    });
  } catch (error) {
    yield put({
      type: ACTION_VERIFY_TOKEN_FAIl,
    });
  }
}

export default function* cAuthSaga() {
  yield takeEvery(ACTION_LOGIN, Login);
  yield takeEvery(ACTION_SIGNUP, Signup);
  yield takeEvery(ACTION_LOGOUT, Logout);
  yield takeEvery(ACTION_VERIFY_TOKEN, VerifyToken);
}
