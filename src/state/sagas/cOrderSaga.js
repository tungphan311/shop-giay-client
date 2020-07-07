import { takeEvery, select, put } from "redux-saga/effects";
import { ACTION_PLACE_ORDER } from "state/reducers/cOrderReducer";
import { toast, toastErr } from "utils";
import { cPlaceOrder, cGetOrder } from "services/cOrderService";
import { ACTION_FORCE_LOGOUT } from "../reducers/cAuthReducer";
import history from "state/history";
import { clientGetOrderAction } from "state/actions/index";
import { call } from "file-loader";
import {
  resolvePromiseAction,
  rejectPromiseAction,
} from "@adobe/redux-saga-promise";

function* placeOrder(action) {
  //const { paymentMethod, shippingMethod } = action.payload;
  const { id } = yield select((state) => state.corder.address);

  const {
    data: { code, data },
  } = yield cPlaceOrder({ id });

  switch (code) {
    case "OK":
      const parsed = JSON.parse(data);
      history.push("/order/" + parsed.id);
      toast({ message: "Đặt đơn hàng thành công" });
      break;
    default:
      yield put({ type: ACTION_FORCE_LOGOUT });
      toastErr("Vui lòng đăng nhập");
      history.push("/login");
  }
}

function* getOrder(action) {
  try {
    const { page, pageSize } = action.payload;

    const {
      data: { code, data, totalRecords },
    } = yield call(cGetOrder, { page, pageSize });

    const res = { code, data, totalRecords };

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
