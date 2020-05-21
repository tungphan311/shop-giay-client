import React from "react";
import "./input.scss";

const AInput = ({
  placeholder = "",
  className = "",
  label = "",
  hoang = "",
  type = "text",
  meta = {}, // redux form
  input, // redux form
}) => {
  const { touched, error } = meta;

  const showError = touched && error;
  const { errCode } = error || {};

  return (
    <div className="input__container">
      <label className={`${!label ? "d-none" : "input__label"}`}>{label}</label>
      <div>
        <input
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

export default AInput;
