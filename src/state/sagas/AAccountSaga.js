import { takeEvery, put, call, select } from "redux-saga/effects";
import { toast, toastErr } from "utils";

import { getFormValues as getReduxFormValues } from "redux-form";
import { FORM_KEY_ADDACCOUNT } from "state/reducers/formReducer";
import {
  addAccount,
  getAllAccount,
  editAccout,
  getAccountById,
} from "services/admin/accountServices";
import {
  ADD_ACCOUNT,
  GET_ALL_ACCOUNT_SUCCESS,
  GET_ALL_ACCOUNT,
  GET_ACCOUNT_BY_ID,
  GET_ACCOUNT_BY_ID_SUCCESS,
  EDIT_ACCOUNT,
} from "state/reducers/AAccountReducer";
// import getAllAccountAction from "state/reducers/index";

export const getFormValues = (state, formName) =>
  getReduxFormValues(formName)(state);

export function* editAccoutSaga({ id }) {
  try {
    let { userName, roleId, name, email, phoneNumber } = yield select((state) =>
      getFormValues(state, FORM_KEY_ADDACCOUNT)
    );
    roleId = parseInt(roleId.value);
    const result = yield call(editAccout, {
      userName,
      roleId,
      name,
      email,
      phoneNumber,
      id,
    });
    toast({ message: result.data.msg });
  } catch (err) {
    yield toastErr(String(err));
  }
}

export function* getAccountByIdSaga({ id }) {
  try {
    const result = yield call(getAccountById, { id });
    const responseJSON = result.data.data;

    const response = JSON.parse(responseJSON);

    yield put({ type: GET_ACCOUNT_BY_ID_SUCCESS, response });
  } catch (err) {
    yield toastErr(String(err));
  }
}

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
  yield takeEvery(GET_ACCOUNT_BY_ID, getAccountByIdSaga);
  yield takeEvery(EDIT_ACCOUNT, editAccoutSaga);
}
