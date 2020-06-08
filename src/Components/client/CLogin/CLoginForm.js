import { reduxForm, Field } from "redux-form";
import React from "react";
import CButton from "Components/client/CButton";
import CInput from "../CInput";
import { require } from "utils/index";

export const LOGIN_FORM_KEY = "FORM/LOGIN";

function CLoginForm({ handleSubmit }) {
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
      <CButton className="submit-button" type="submit" label="Đăng nhập" />
    </form>
  );
}

export default reduxForm({
  form: LOGIN_FORM_KEY,
})(CLoginForm);
