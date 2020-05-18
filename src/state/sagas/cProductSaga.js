import { getFormValues } from "redux-form";
import { RATING_FORM_KEY } from "Components/client/CProductRating/CRatingForm";
import { select, takeEvery, call, put } from "redux-saga/effects";
import {
  cRateProduct,
  cGetProductDetail,
} from "../../services/cProductService";
import { toastErr, toast } from "utils";
import history from "state/history";
import {
  ACTION_GET_PRODUCT_DETAIL,
  ACTION_RATE_PRODUCT,
} from "state/reducers/cProductReducer";
import {
  ACTION_GET_PRODUCT_DETAIL_SUCCESS,
  ACTION_GET_PRODUCT_DETAIL_FAIL,
} from "../reducers/cProductReducer";

function* productRating(action) {
  const { productId } = action.payload;
  const { rating, reviewTitle, reviewContent } = yield select((state) =>
    getFormValues(RATING_FORM_KEY)(state)
  );

  const {
    data: { code },
  } = yield call(cRateProduct, { shoesId: productId, rating });

  switch (code) {
    case "OK":
      //fetch new product detail
      yield put({
        type: ACTION_GET_PRODUCT_DETAIL,
        payload: { id: productId },
      });
      yield call(history.push, "/products/" + productId);
      yield call(toast, { message: "Đã gửi đánh giá" });
      break;
    default:
      const { pathname } = history.location;
      yield call(history.push, "/login?r=" + pathname);
      yield call(toastErr, "Bạn phải đăng nhập để đánh giá sản phẩm");
  }
}

function* getProductDetail(action) {
  const { id } = action.payload;
  const {
    data: { code, data },
  } = yield call(cGetProductDetail, id);
  switch (code) {
    case "OK":
      yield put({
        type: ACTION_GET_PRODUCT_DETAIL_SUCCESS,
        payload: { data: JSON.parse(data) },
      });
      break;
    default:
      yield put({ type: ACTION_GET_PRODUCT_DETAIL_FAIL });
      toastErr("Sản phẩm không tồn tại");
  }
}

export default function* cProductSaga() {
  yield takeEvery(ACTION_RATE_PRODUCT, productRating);
  yield takeEvery(ACTION_GET_PRODUCT_DETAIL, getProductDetail);
}
