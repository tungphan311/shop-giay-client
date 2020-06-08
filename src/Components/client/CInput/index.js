import React from "react";
import "./Input.scss";

const CInput = ({
  placeholder = "",
  className = "",
  label = "",
  type = "text",
  labelClassName = "",
  icon,
  meta = {}, // redux form
  input, // redux form
}) => {
  const { touched, error } = meta;

  const showError = touched && error;
  const { errCode } = error || {};

  return (
    <div className="input__container">
      <label className={`${!label ? "d-none" : labelClassName}`}>{label}</label>
      <div className="input__wrapper" style={{ position: "relative" }}>
        {icon && (
          <label className="input__icon" htmlFor={input.name}>
            <i className={`icon-${icon}`}></i>
          </label>
        )}
        <input
          id={input.name}
          {...input}
          placeholder={placeholder}
          className={`input__field ${className}`}
          type={type}
        />
        {showError && <span className="error">{errCode}</span>}
      </div>
    </div>
  );
};

export default CInput;
