import { reduxForm, Field, isDirty } from "redux-form";
import React from "react";
import CButton from "Components/client/CButton";
import CInput from "../CInput";
import { require } from "utils/index";
import { connect } from "react-redux";

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

CLoginForm = reduxForm({
  form: LOGIN_FORM_KEY,
})(CLoginForm);

CLoginForm = connect((state) => ({
  shouldValidate: () => isDirty(LOGIN_FORM_KEY)(state),
}))(CLoginForm);

export default CLoginForm;
