import { Field, reduxForm } from "redux-form";
import React from "react";
import CButton from "Components/client/CButton";
import CStarSelector from "Components/client/CStarSelector";
import { require } from "utils/index";

export const RATING_FORM_KEY = "FORM/RATING";

function RatingForm({ handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="product-rating-wrapper">
        <div className="product-rating">
          <div className="title">ĐÁNH GIÁ SẢN PHẨM NÀY</div>
          <div className="require-info required-star">Bắt buộc</div>
          <div className="rating-container">
            <div className="rating-title required-star">OVERALL RATING</div>
            <Field
              component={CStarSelector}
              validate={[require]}
              name="rating"
            />
          </div>
        </div>
      </div>
      <div className="review-input-row">
        <div className="review-input-label"></div>
        <div className="review-button-container">
          <CButton
            className="review-button"
            type="submit"
            label="GỬI ĐÁNH GIÁ"
          />
        </div>
      </div>
    </form>
  );
}

export default reduxForm({
  form: RATING_FORM_KEY,
})(RatingForm);
