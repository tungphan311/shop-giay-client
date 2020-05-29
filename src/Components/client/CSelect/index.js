import React from "react";
import "./CSelect.scss";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { change } from "redux-form";

const CSelect = ({
  placeholder = "",
  className = "",
  label = "",
  labelClassName = "",
  options,
  formName,
  isLoading = false,
  noOptionsMessage = "No options",
  loadingMessage,
  meta = {}, // redux form
  input, // redux form
}) => {
  const { touched, error } = meta;
  const showError = touched && error;
  const { errCode } = error || {};

  const dispatch = useDispatch();
  if (typeof input.value !== "object") {
    const selected = options.find((x) => x.label === input.value);
    if (selected) dispatch(change(formName, input.name, selected));
  }
  return (
    <div className="select__wrapper">
      <label className={`${!label ? "d-none" : labelClassName}`}>{label}</label>
      <div className={`input__wrapper`} style={{ position: "relative" }}>
        <Select
          isLoading={isLoading}
          isSearchable
          isClearable
          loadingMessage={() => loadingMessage}
          className={`select__field ${
            showError ? "show-error" : ""
          } ${className}`}
          placeholder={placeholder}
          noOptionsMessage={() => noOptionsMessage}
          onChange={(value) => {
            dispatch(change(formName, input.name, value));
          }}
          options={options}
          value={input.value}
        />
        {showError && <span className="error">{errCode}</span>}
      </div>
    </div>
  );
};

export default CSelect;
