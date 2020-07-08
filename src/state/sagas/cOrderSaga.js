import { takeEvery, select, put, call } from "redux-saga/effects";
import { ACTION_PLACE_ORDER } from "state/reducers/cOrderReducer";
import { toast, toastErr } from "utils";
import { cPlaceOrder, cGetOrder } from "services/cOrderService";
import { ACTION_FORCE_LOGOUT } from "../reducers/cAuthReducer";
import history from "state/history";
import { clientGetOrderAction } from "state/actions/index";
import {
  resolvePromiseAction,
  rejectPromiseAction,
} from "@adobe/redux-saga-promise";

function* placeOrder(action) {
  try {
    //const { paymentMethod, shippingMethod } = action.payload;
    const { id } = yield select((state) => state.corder.address);

    const {
      data: { data },
    } = yield cPlaceOrder({ id });

    const parsed = JSON.parse(data);
    history.push("/order/" + parsed.id);
    toast({ message: "Đặt đơn hàng thành công" });
  } catch (err) {
    yield put({ type: ACTION_FORCE_LOGOUT });
    yield toastErr(err);
    history.push("/login");
  }
}

function* getOrder(action) {
  try {
    const { page, pageSize } = action.payload;
<<<<<<< HEAD

    const res = yield call(cGetOrder, { page, pageSize });

=======
    const {
      data: { code, data, totalRecords },
    } = yield call(cGetOrder, { page, pageSize });
    const res = { code, data, totalRecords };
>>>>>>> fix saga
    yield call(resolvePromiseAction, action, res);
  } catch (error) {
    toastErr(error);
    history.push("/login");
  }
}

export default function* cOrderSaga() {
  yield takeEvery(ACTION_PLACE_ORDER, placeOrder);
  yield takeEvery(clientGetOrderAction, getOrder);
}
