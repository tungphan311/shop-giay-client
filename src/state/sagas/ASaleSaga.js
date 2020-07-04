import { takeEvery, put, call, select } from "redux-saga/effects";
import { toast, toastErr } from "utils";

import { getFormValues as getReduxFormValues } from "redux-form";
import { FORM_KEY_ADDPROMOTE } from "state/reducers/formReducer";
import { addSale } from "services/admin/saleServices";
import { ADD_SALE } from "state/reducers/ASaleReducer";

export const getFormValues = (state, formName) =>
  getReduxFormValues(formName)(state);

export function* addSaleSaga() {
  try {
    let {
      saleType,
      amount,
      saleProducts,
      beginDate,
      expiredDate,
    } = yield select((state) => getFormValues(state, FORM_KEY_ADDPROMOTE));

    amount = parseInt(amount);
    saleType = saleType.value;
    saleProducts = saleProducts.map((ele) => ({
      shoesId: ele.value,
    }));
    beginDate = new Date(beginDate).toISOString();
    expiredDate = new Date(expiredDate).toISOString();

    console.log("a", {
      saleType,
      amount,
      saleProducts,
      beginDate,
      expiredDate,
    });

    const result = yield call(addSale, {
      saleType,
      amount,
      saleProducts,
      beginDate,
      expiredDate,
      status: 1,
    });
    console.log(result);

    toast({ message: result.data.msg });
  } catch (err) {
    const {
      response: { status },
    } = err;

    if (status === 401) {
      yield toastErr("Bạn không có quyền thực hiện chức năng này");
    } else {
      yield toastErr(String(err));
    }
  }
}

export default function* aSaleSaga() {
  yield takeEvery(ADD_SALE, addSaleSaga);
}
