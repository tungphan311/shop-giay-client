import "./Button.scss";
import React from "react";
import history from "state/history";

const CButton = ({ label, type, onClick, href, className }) => (
  <button
    type={type}
    onClick={(e) => {
      if (href) history.push(href);
      else if (onClick) onClick(e);
    }}
    className={`button-default ${className ? className : ""}`}
  >
    {label}
  </button>
);

export default CButton;
