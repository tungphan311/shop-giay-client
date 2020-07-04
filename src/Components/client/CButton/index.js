import "./Button.scss";
import React from "react";
import history from "state/history";
import { Event } from "Components/Tracking/index";

const CButton = ({ label, type, onClick, href, className, event }) => {
  const handleClick = (e) => {
    if (href) history.push(href);
    else if (onClick) onClick(e);

    if (event) {
      const { category, action, label } = event;
      Event(category, action, label);
    }
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      className={`button-default ${className ? className : ""}`}
    >
      {label}
    </button>
  );
};

export default CButton;
