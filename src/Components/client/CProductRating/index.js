import React from "react";
import "./ProductRating.scss";
import CRatingForm from "./CRatingForm";
import { useDispatch } from "react-redux";
import { ACTION_RATE_PRODUCT } from "state/reducers/cProductReducer";

const CProductRating = ({ id }) => {
  const dispatch = useDispatch();
  const ratingSubmit = () =>
    dispatch({ type: ACTION_RATE_PRODUCT, payload: { productId: id } });

  return <CRatingForm onSubmit={ratingSubmit} />;
};

export default CProductRating;
