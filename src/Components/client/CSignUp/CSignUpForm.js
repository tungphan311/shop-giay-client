import React from "react";
import { reduxForm, Field } from "redux-form";
import CInput from "../CInput/index";
import CButton from "Components/client/CButton";
import {
  require,
  password,
  dateOfBirth,
  email,
  phoneNumber,
} from "utils/index";
import Cleave from "cleave.js/react";
import { connect } from "react-redux";

export const SIGNUP_FORM_KEY = "FORM/SIGNUP";

const CleaveInput = ({
  label,
  labelClassName,
  className,
  placeholder = "",
  options = {},
  input,
  icon = null,
  meta = {},
}) => {
  const { touched, error } = meta;
  const showError = touched && error;
  const { errCode } = error || {};

  return (
    <div className="input__container">
      <label className={`${!label ? "d-none" : labelClassName}`}>{label}</label>
      <div className="input__wrapper" style={{ position: "relative" }}>
        <div>
          {icon && (
            <label className="input__icon" htmlFor={input.name}>
              <i className={`icon-${icon}`}></i>
            </label>
          )}
          <Cleave
            {...input}
            placeholder={placeholder}
            options={options}
            onChange={input.onChange}
            className={`input__field ${className}`}
          />
        </div>
        {showError && <span className="error">{errCode}</span>}
      </div>
    </div>
  );
};

function CSignupForm({ handleSubmit }) {
  return (
    <form
      className="form-group text-left mb-1"
      onSubmit={handleSubmit}
      noValidate
    >
      <Field
        component={CInput}
        validate={[require]}
        name="username"
        label="Tên đăng nhập"
        labelClassName="username-label"
        className="username-input"
        placeholder="info@example.com"
        icon="user"
      />
      <Field
        type="password"
        component={CInput}
        validate={[require, password]}
        name="password"
        label="Mật khẩu"
        labelClassName="username-label"
        className="username-input"
        placeholder="**********"
        icon="lock"
      />
      <Field
        component={CInput}
        validate={[require]}
        name="name"
        label="Họ và tên"
        labelClassName="username-label"
        className="username-input"
        placeholder="Nguyễn Thị A"
      />
      <div className="dob_gender_container">
        <div className="dob__container">
          <Field
            name="dateOfBirth"
            label="Ngày sinh"
            labelClassName="username-label"
            className="username-input width-10"
            placeholder="dd/MM/YYYY"
            options={{
              date: true,
              datePattern: ["d", "m", "Y"],
              delimiter: "/",
            }}
            component={CleaveInput}
            validate={[require, dateOfBirth]}
          />
        </div>
        <div className="input__container">
          <label className="username-label">Giới tính</label>
          <div>
            <Field
              component="select"
              name="gender"
              label="Giới tính"
              labelClassName="username-label"
              className="username-input"
            >
              <option value="male">Nam</option>
              <option value="female">Nữ</option>
            </Field>
          </div>
        </div>
      </div>
      <Field
        component={CInput}
        validate={[require, email]}
        name="email"
        label="Địa chỉ email"
        labelClassName="username-label"
        className="username-input"
        placeholder="abc@gmail.com"
        icon="email"
      />
      <Field
        component={CInput}
        validate={[require, phoneNumber]}
        name="phoneNumber"
        label="Số điện thoại"
        labelClassName="username-label"
        className="username-input"
        placeholder="0123 345 869"
        options={{ phone: true, phoneRegionCode: "vi" }}
        icon="phone"
      />
      <CButton className="submit-button" type="submit" label="Đăng ký" />
    </form>
  );
}

CSignupForm = reduxForm({
  form: SIGNUP_FORM_KEY,
})(CSignupForm);

CSignupForm = connect(() => ({
  initialValues: {
    gender: "male",
  },
}))(CSignupForm);

export default CSignupForm;
