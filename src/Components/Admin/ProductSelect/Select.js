import React from "react";
import ReactSelect from "react-select";
import "./Select.scss";

function AProductSelect({
  selectedOption,
  options,
  onChange,
  className,
  disabled,
  onFocus,
  onBlur,
  name,
  defaultValue,
  placeholder,
  isMulti,
  label,
}) {
  return (
    <div className={`hara__dropdown ${className}`}>
      <label>{label}</label>
      <ReactSelect
        name={name}
        options={options}
        classNamePrefix="hara__select"
        defaultValue={defaultValue}
        value={selectedOption}
        onFocus={onFocus}
        onBlur={onBlur}
        isMulti={isMulti}
        onChange={onChange}
        isDisabled={disabled}
        placeholder={placeholder}
        menuPosition="fixed"
      />
    </div>
  );
}

export default AProductSelect;
