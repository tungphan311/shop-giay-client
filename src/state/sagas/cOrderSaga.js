import { takeEvery, select } from "redux-saga/effects";
import { ACTION_PLACE_ORDER } from "state/reducers/cOrderReducer";
import { getFormValues } from "redux-form";
import { ADDRESS_FORM_KEY } from "Components/client/CAddressForm/index";
import { toast } from "utils";
function* placeOrder(action) {
  const { paymentMethod, shippingMethod } = action.payload;
  const {
    fullName,
    address,
    city,
    district,
    ward,
    phoneNumber,
  } = yield select((state) => getFormValues(ADDRESS_FORM_KEY)(state));

  yield console.log(
    paymentMethod,
    shippingMethod,
    fullName,
    address,
    city,
    district,
    ward,
    phoneNumber
  );

  //do api call

  yield toast({ message: "Đặt hàng thành công" });
}

export default function* cOrderSaga() {
  yield takeEvery(ACTION_PLACE_ORDER, placeOrder);
}
