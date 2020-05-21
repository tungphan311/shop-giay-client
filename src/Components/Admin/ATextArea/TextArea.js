import React from "react";
import "./TextArea.scss";

const ATextArea = ({
  placeholder = "",
  className = "",
  label = "",
  rows = "1",
  meta = {}, // redux form
  input, // redux form
}) => {
  const { touched, error } = meta;

  const showError = touched && error;
  const { errCode } = error || {};

  return (
    <div className="input__container">
      <label className={`${!label ? "d-none" : "textarea__label"}`}>
        {label}
      </label>
      <div>
        <textarea
          {...input}
          placeholder={placeholder}
          rows={rows}
          className={`textarea__field ${className}`}
        />
        {showError && <span className="error">{errCode}</span>}
      </div>
    </div>
  );
};

export default ATextArea;
