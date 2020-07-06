import { takeEvery, put, call, select } from "redux-saga/effects";
import {
  getProviderServices,
  deleteProviderService,
  addProviderService,
} from "services/admin/providerServices";
import { SET_LOADING, SET_AUTHORIZE } from "state/reducers/aLoadingReducer";
import {
  getProviderAction,
  deleteProviderAction,
  addProviderAction,
} from "state/actions/index";
import {
  resolvePromiseAction,
  rejectPromiseAction,
} from "@adobe/redux-saga-promise";
import { getFormValues } from "redux-form";
import { FORM_KEY_ADD_PROVIDER } from "state/reducers/formReducer";
import { toast } from "utils/index";

export function* getCustomerSaga(action) {
  try {
    yield put({ type: SET_LOADING });

    const token = yield select((state) => state.aAuth.token);

    const { pageSize, page } = action.payload;
    const result = yield call(getProviderServices, {
      pageSize,
      page,
      token,
    });
    const responseJSON = result.data.data;
    const { total } = result.data;

    const response = JSON.parse(responseJSON);

    const res = { total, response };

    yield call(resolvePromiseAction, action, res);
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

export function* deleteProviderSaga(action) {
  try {
    const token = yield select((state) => state.aAuth.token);

    yield put({ type: SET_LOADING });
    const ids = action.payload;

    yield call(deleteProviderService, { ids, token });

    yield call(resolvePromiseAction, action);
  } catch (err) {
    const {
      response: { status },
    } = err;

    if (status === 401) {
      yield call(
        rejectPromiseAction,
        action,
        "Bạn không có quyền để thực hiện chức năng này"
      );
    } else {
      yield call(rejectPromiseAction, action, String(err));
    }
  } finally {
    yield put({ type: SET_LOADING, status: false });
  }
}

export function* addProviderSaga(action) {
  try {
    yield put({ type: SET_LOADING });

    const token = yield select((state) => state.aAuth.token);

    const { name, email, address, phoneNumber, TIN } = yield select((state) =>
      getFormValues(FORM_KEY_ADD_PROVIDER)(state)
    );

    yield call(addProviderService, {
      name,
      email,
      address,
      phoneNumber,
      TIN,
      token,
    });

    yield toast({ message: "Thêm nhà cung cấp thành công" });
    yield call(resolvePromiseAction, action);
  } catch (err) {
    const {
      response: { status },
    } = err;

    if (status === 401) {
      yield put({ type: SET_AUTHORIZE, stt: false });
    }
  } finally {
    yield put({ type: SET_LOADING, status: false });
  }
}

export default function* aProviderSaga() {
  yield takeEvery(getProviderAction, getCustomerSaga);
  yield takeEvery(deleteProviderAction, deleteProviderSaga);
  yield takeEvery(addProviderAction, addProviderSaga);
}
