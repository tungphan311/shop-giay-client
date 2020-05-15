import React, { useState } from "react";
import { change } from "redux-form";
import "./StarSelector.scss";
import { useDispatch } from "react-redux";
import { RATING_FORM_KEY } from "Components/client/CProductRating/CRatingForm";
const STAR_COUNT = Array(5).fill(1);
const CStarSelector = ({ meta = {}, input }) => {
  const [rating, setRating] = useState(0);
  const [previewRating, setPreviewRating] = useState(0);

  const { touched, error } = meta;
  const showError = touched && error;

  const isActive = (index) => {
    if (previewRating) {
      if (index < previewRating) return true;
    } else {
      if (index < rating) return true;
    }

    return false;
  };
  const ratingInfo = (index) => {
    switch (index) {
      case 1:
        return "Dỏm";
      case 2:
        return "Tầm thường";
      case 3:
        return "Tàm tạm";
      case 4:
        return "Ngon";
      case 5:
        return "Tuyệt zời";
      default:
        return "(Vui lòng cho điểm)";
    }
  };

  const dispatch = useDispatch();

  dispatch(change(RATING_FORM_KEY, "rating", rating));

  return (
    <div className="star-selector-wrapper">
      <input type="hidden" {...input} />
      <div className="star-container">
        {STAR_COUNT.map((value, index) => (
          <div
            key={index}
            className={`star ${isActive(index) ? "active" : ""}`}
            onMouseEnter={() => setPreviewRating(index + 1)}
            onMouseLeave={() => setPreviewRating(0)}
            onClick={() => setRating(index + 1)}
          />
        ))}
      </div>
      <div className={`star-selector-info ${showError ? "highlight" : ""}`}>
        {ratingInfo(previewRating ? previewRating : rating)}
      </div>
    </div>
  );
};

export default CStarSelector;
