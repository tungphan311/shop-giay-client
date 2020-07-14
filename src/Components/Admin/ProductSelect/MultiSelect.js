import React from "react";
import AProductSelect from "Components/Admin/ProductSelect/Select";

function AMultiSelect({ input, meta, ...props }) {
  const { touched, error } = meta;

  const showError = touched && error;
  const { errCode } = error || {};

  return (
    <div>
      <AProductSelect
        value={input.value}
        onChange={input.onChange}
        {...props}
      />
      {showError && (
        <span style={{ position: "absolute", color: "#f25961" }}>
          {errCode}
        </span>
      )}
    </div>
  );
}

export default AMultiSelect;
