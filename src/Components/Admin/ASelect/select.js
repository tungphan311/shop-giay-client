import React from "react";
import "./select.scss";

// const Option = (selectlist = {}) =>(
//     for(int )
// )

const ASelect = ({
  className = "",
  formClassName = "",
  label = "",
  meta = {}, //redux form
  input, //redux form
  selectlist = [],
  onChange,
  selectName,
}) => {
  const { touched, error } = meta;

  const showError = touched && error;
  const { errCode } = error || {};

  return (
    <div className={`input__container ${formClassName}`}>
      <label>{label}</label>
      <div>
        <select
          {...input}
          className="select"
          name={selectName}
          // onChange={onChange}
        >
          {selectlist.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <div>{showError && <span className="error">{errCode}</span>}</div>
      </div>
    </div>
  );
};

export default ASelect;
