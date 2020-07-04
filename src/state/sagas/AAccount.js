import { takeEvery, put, call, select } from "redux-saga/effects";
import { toast, toastErr } from "utils";

import { getFormValues as getReduxFormValues } from "redux-form";
import { FORM_KEY_ADDACCOUNT } from "state/reducers/formReducer";
import { addAccount, getAllAccount } from "services/admin/accountServices";
import {
  ADD_ACCOUNT,
  GET_ALL_ACCOUNT_SUCCESS,
  GET_ALL_ACCOUNT,
} from "state/reducers/AAccount";
// import getAllAccountAction from "state/reducers/index";

export const getFormValues = (state, formName) =>
  getReduxFormValues(formName)(state);

export function* addAccountSaga() {
  try {
    let {
      userName,
      password,
      roleId,
      name,
      email,
      phoneNumber,
    } = yield select((state) => getFormValues(state, FORM_KEY_ADDACCOUNT));
    console.log({
      userName,
      password,
      roleId,
      name,
      email,
      phoneNumber,
    });
    roleId = parseInt(roleId.value);
    const result = yield call(addAccount, {
      userName,
      password,
      roleId,
      name,
      email,
      phoneNumber,
    });
    toast({ message: result.data.msg });
  } catch (err) {
    yield toastErr(String(err));
  }
}

export function* getAllAccountSaga() {
  try {
    const result = yield call(getAllAccount);
    const responseJSON = result.data.data;

    const response = JSON.parse(responseJSON);

    yield put({ type: GET_ALL_ACCOUNT_SUCCESS, response });
  } catch (err) {
    yield toastErr(String(err));
  }
}

export default function* aAccountSaga() {
  yield takeEvery(ADD_ACCOUNT, addAccountSaga);
  yield takeEvery(GET_ALL_ACCOUNT, getAllAccountSaga);
}
