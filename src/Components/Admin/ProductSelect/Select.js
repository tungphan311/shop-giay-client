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
}) {
  console.log(placeholder);
  return (
    <div className={`hara__dropdown ${className}`}>
      <ReactSelect
        name={name}
        options={options}
        classNamePrefix="hara__select"
        defaultValue={defaultValue}
        value={selectedOption}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        isDisabled={disabled}
        placeholder={placeholder}
        menuPosition="fixed"
      />
    </div>
  );
}

export default AProductSelect;
