import React, { Component } from "react";
import ReactDatePicker from "react-datepicker";

import "./DatePicker.scss";

const CustomInput = React.forwardRef((props, ref) => {
  const { onClick, value, placeholder } = props;
  return (
    <input
      onClick={onClick}
      value={value}
      type="text"
      readOnly
      ref={ref}
      placeholder={placeholder}
    />
  );
});

class ADatePicker extends Component {
  render() {
    const { color = "blue", meta, input, label, placeholder } = this.props;
    const { touched, error } = meta;
    const showError = touched && error;
    const { errCode } = error || {};

    return (
      <div className={`md__date--picker--container input__container ${color}`}>
        <label>{label}</label>
        <div>
          <ReactDatePicker
            className="datePicker"
            placeholderText={placeholder}
            customInput={<CustomInput />}
            selected={input.value}
            onChange={input.onChange}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            dateFormat="dd/MM/yyyy"
          />
          <div>{showError && <span className="error">{errCode}</span>}</div>
        </div>
      </div>
    );
  }
}

export default ADatePicker;
