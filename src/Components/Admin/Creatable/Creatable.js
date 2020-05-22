import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";

function ACreatable({
  loading,
  handleChange,
  handleCreate,
  options,
  value,
  placeholder,
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
      placeholder={placeholder}
    />
  );
}

export default ACreatable;
