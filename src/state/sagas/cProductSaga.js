import { getFormValues } from "redux-form";
import { RATING_FORM_KEY } from "Components/client/CProductRating/CRatingForm";
import { select, takeEvery, call, put } from "redux-saga/effects";
import {
  cRateProduct,
  cGetProductDetail,
  cGetProducts,
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
import { clientGetProductAction } from "state/actions/index";
import {
  resolvePromiseAction,
  rejectPromiseAction,
} from "@adobe/redux-saga-promise";

function* productRating(action) {
  try {
    const { productId } = action.payload;
    //reviewTitle, reviewContent
    const { rating } = yield select((state) =>
      getFormValues(RATING_FORM_KEY)(state)
    );

    yield call(cRateProduct, { shoesId: productId, rating });

    //fetch new product detail
    yield put({
      type: ACTION_GET_PRODUCT_DETAIL,
      payload: { id: productId },
    });
    yield call(history.push, "/products/" + productId);
    yield call(toast, { message: "Đã gửi đánh giá" });
  } catch (err) {
    const { pathname } = history.location;
    yield call(history.push, "/login?r=" + pathname);
    yield call(toastErr, "Bạn phải đăng nhập để đánh giá sản phẩm");
  }
}

function* getProductDetail(action) {
  try {
    const { id } = action.payload;
    const {
      data: { data },
    } = yield call(cGetProductDetail, id);

    yield put({
      type: ACTION_GET_PRODUCT_DETAIL_SUCCESS,
      payload: { data: JSON.parse(data) },
    });
  } catch (err) {
    yield put({ type: ACTION_GET_PRODUCT_DETAIL_FAIL });
    yield toastErr(err);
  }
}

function* getProduct(action) {
  try {
    const { isNew, gender, pageSize } = action.payload;

    const {
      data: { code, data, totalRecords },
    } = yield call(cGetProducts, { isNew, gender, pageSize });

    const res = { code, data, totalRecords };
    yield call(resolvePromiseAction, action, res);
  } catch (error) {
    toastErr(error);
  }
}

export default function* cProductSaga() {
  yield takeEvery(ACTION_RATE_PRODUCT, productRating);
  yield takeEvery(ACTION_GET_PRODUCT_DETAIL, getProductDetail);
  yield takeEvery(clientGetProductAction, getProduct);
}
