import { reduxForm, Field } from "redux-form";
import React from "react";
import CButton from "Components/client/CButton";
import CInput from "../CInput";
import { require } from "utils/index";

export const LOGIN_FORM_KEY = "FORM/LOGIN";

function CLoginForm({ handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} noValidate>
      <Field component={CInput} validate={[require]} name="username" />
      <Field
        type="password"
        component={CInput}
        validate={[require]}
        name="password"
      />
      <CButton type="submit" label="Login" />
    </form>
  );
}

export default reduxForm({
  form: LOGIN_FORM_KEY,
})(CLoginForm);
