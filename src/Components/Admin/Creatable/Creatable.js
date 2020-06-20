import React from "react";
import CreatableSelect from "react-select/creatable";

function ACreatable({
  loading,
  handleChange,
  handleCreate,
  options,
  value,
  placeholder,
  label,
}) {
  return (
    <CreatableSelect
      isClearable
      isDisabled={loading}
      isLoading={loading}
      onChange={handleChange}
      onCreateOption={handleCreate}
      options={options}
      value={value}
      label={label}
      placeholder={placeholder}
      formatCreateLabel={(value) => `Thêm "${value}" vào cơ sở dữ liệu`}
    />
  );
}

export default ACreatable;
