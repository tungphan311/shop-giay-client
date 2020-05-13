import "./Button.scss";
import React from "react";
import history from "state/history";

const CButton = ({ label, onClick, href }) => (
  <button
    onClick={(e) => {
      if (href) history.push(href);
      else if (onClick) onClick(e);
    }}
    className="button-default"
  >
    {label}
  </button>
);

export default CButton;
