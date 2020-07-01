import React from "react";
import "./input.scss";

const AInput = ({
  placeholder = "",
  className = "",
  formClassName = "",
  label = "",
  append = "",
  type = "text",
  meta = {}, // redux form
  input, // redux form
}) => {
  const { touched, error } = meta;

  const showError = touched && error;
  const { errCode } = error || {};

  return (
    <div className={`input__container ${formClassName}`}>
      <label className={`${!label ? "d-none" : "input__label"}`}>{label}</label>
      <div className="input-group mb-3">
        <input
          {...input}
          placeholder={placeholder}
          className={`input__field ${className}`}
          type={type}
        />
        {append ? (
          <div className="input-group-append">
            <span className="input-group-text">{append}</span>
          </div>
        ) : undefined}
        {showError && (
          <span
            className="error"
            style={{ position: "absolute", color: "#f25961", top: "38px" }}
          >
            {errCode}
          </span>
        )}
      </div>
    </div>
  );
};

export default AInput;
