import React from "react";
import "./Icon.scss";

const CIcon = ({ type, color, className, handleClick }) => {
  className = `da_icon ${className ? className : ""} ${
    color ? `c-${color}` : ""
  } ${type ? `da_icon__${type}` : ""}`;
  return <div onClick={handleClick} className={className}></div>;
};

export default CIcon;
