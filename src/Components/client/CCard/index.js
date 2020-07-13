import React from "react";
import "./Card.scss";

const CCard = ({ children, className }) => (
  <div className={`ccart-wrapper ${className}`}>{children}</div>
);

export default CCard;
