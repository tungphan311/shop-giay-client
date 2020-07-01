import React from "react";
import "./select.scss";
import Select from "react-select";

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
        <Select
          {...input}
          className="select"
          options={selectlist}
          name={selectName}
        >
          {/* {selectlist.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))} */}
        </Select>
        <div>{showError && <span className="error">{errCode}</span>}</div>
      </div>
    </div>
  );
};

export default ASelect;
