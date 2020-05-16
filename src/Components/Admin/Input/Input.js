import React from "react";
import "./Input.scss";

function AInput({ label, id, inputType = "text", placeholder, icon }) {
  return (
    <div className="form-group text-left mb-4">
      <span>{label}</span>
      <label htmlFor={id}>
        <i className={icon}></i>
      </label>
      <input
        className="form-control"
        id={id}
        type={inputType}
        placeholder={placeholder}
      />
    </div>
  );
}

export default AInput;
