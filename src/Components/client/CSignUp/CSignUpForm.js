import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import CInput from "../CInput/index";
import CButton from "Components/client/CButton";
import CDatePickerField from "Components/client/CDatePicker";
import Select from "react-select";
import { require } from "utils/index";

export const SIGNUP_FORM_KEY = "FORM/SIGNUP";

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
        validate={[require]}
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
        // Todo: add date time picker here
        <div className="dob__container">
          <Field
            component={CInput}
            name="dateOfBirth"
            label="Ngày sinh"
            labelClassName="username-label"
            className="username-input"
            placeholder="YYYY/MM/DD"
          />
        </div>
        <div className="input__container">
          <label className="username-label">Giới tính</label>
          <div>
            <Field
              component="select"
              validate={[]}
              name="gender"
              label="Giới tính"
              labelClassName="username-label"
              className="username-input"
            >
              <option value="Male">Nam</option>
              <option value="Female">Nữ</option>
              <option value="Undefined">Không xác định</option>
            </Field>
          </div>
        </div>
      </div>
      <Field
        component={CInput}
        validate={[require]}
        name="email"
        label="Địa chỉ email"
        labelClassName="username-label"
        className="username-input"
        placeholder="abc@gmail.com"
        icon="email"
      />
      <Field
        component={CInput}
        validate={[]}
        name="phoneNumber"
        label="Số điện thoại"
        labelClassName="username-label"
        className="username-input"
        placeholder="012345869"
        icon="phone"
      />
      //Todo: Hanlde submit button
      <CButton className="submit-button" type="submit" label="Đăng ký" />
    </form>
  );
}
export default reduxForm({
  form: SIGNUP_FORM_KEY,
})(CSignupForm);
