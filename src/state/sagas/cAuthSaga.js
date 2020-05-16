import { takeEvery, select, call, put } from "redux-saga/effects";
import { ACTION_LOGIN } from "state/reducers/cAuthReducer";
import { getFormValues } from "redux-form";
import { LOGIN_FORM_KEY } from "Components/client/CLogin/CLoginForm.js";
import { cLogin } from "services/cAuthService";
import {
  ACTION_LOGIN_FAIL,
  ACTION_LOGIN_SUCCESS,
} from "../reducers/cAuthReducer";
function* Login(action) {
  const { username, password } = yield select((state) =>
    getFormValues(LOGIN_FORM_KEY)(state)
  );
  console.log(username + " " + password);
  //const result = yield call(cLogin, { username, password });

  yield put({
    type: ACTION_LOGIN_SUCCESS,
    payload: {
      username: username,
      token:
        "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0aHUiLCJpYXQiOjE1ODk2MjI5MDUsImV4cCI6MTU5MDYyMjkwNX0.tdb8YJEl6ExhOJ5i44NKegi3hML0mf-Q-X8JmyTXd3bgg_Y1FwjMjBxRPi5AxfZAaSYQzcCFLpeH5vF8dEKwCA",
    },
  });
}

export default function* cAuthSaga() {
  yield takeEvery(ACTION_LOGIN, Login);
}
