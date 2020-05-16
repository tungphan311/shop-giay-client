import React from "react";
import "./Toaster.scss";

const Toaster = ({ type, message }) => (
  <div className={`md__toast md__toast--${type}`}>
    <div className={`icon icon--${type}`} />
    <div className="md__toast--message">
      <span>{message}</span>
    </div>
  </div>
);

export default Toaster;
