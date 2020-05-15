import { getFormValues } from "redux-form";
import { RATING_FORM_KEY } from "Components/client/CProductRating/CRatingForm";
import { select, takeEvery } from "redux-saga/effects";

export const PRODUCT_RATING = "PRODUCT/RATING";

function* productRating(action) {
  const { productId } = action.payload;
  const { rating, reviewTitle, reviewContent } = yield select((state) =>
    getFormValues(RATING_FORM_KEY)(state)
  );
  console.log(productId);
  console.log(rating);
  console.log(reviewTitle);
  console.log(reviewContent);
  //do api call here
}

export default function* cartSaga() {
  yield takeEvery(PRODUCT_RATING, productRating);
}
