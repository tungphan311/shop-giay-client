import React from "react";
import "./ProductRating.scss";
import CRatingForm from "./CRatingForm";
import { useDispatch } from "react-redux";
import { PRODUCT_RATING } from "state/sagas/productSaga";

const CProductRating = ({ id }) => {
  const dispatch = useDispatch();
  const ratingSubmit = () =>
    dispatch({ type: PRODUCT_RATING, payload: { productId: id } });

  return <CRatingForm onSubmit={ratingSubmit} />;
};

export default CProductRating;
