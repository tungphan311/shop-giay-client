import React from "react";
import { Field, reduxForm } from "redux-form";
import AInput from "Components/Admin/AInput/input";
import { FORM_KEY_ADD_PROVIDER } from "state/reducers/formReducer";
import { connect } from "react-redux";

function AAddProviderForm({ handleSubmit }) {
  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="row" style={{ justifyContent: "center" }}>
        <div className="col-lg-5 col-md-8 col-sm-8">
          <div className="row">
            <div className="card" style={{ padding: "0 40px", width: "100%" }}>
              <div className="card-body" style={{ padding: 0 }}>
                <Field
                  label="Tên nhà cung cấp"
                  name="name"
                  component={AInput}
                />
                <Field label="Email" name="email" component={AInput} />
                <Field label="Địa chỉ" name="address" component={AInput} />
                <Field
                  label="Số điện thoại"
                  name="phoneNumber"
                  component={AInput}
                />
                <Field label="Mã số thuế" name="TIN" component={AInput} />
              </div>
              <div
                className="card-footer"
                style={{
                  textAlign: "right",
                  marginTop: "30px",
                  paddingRight: 0,
                }}
              >
                <button className="btn btn-primary btn-border mr-2">
                  Nhập lại
                </button>
                <button type="submit" className="btn btn-primary">
                  Cập nhật
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

AAddProviderForm = reduxForm({
  form: FORM_KEY_ADD_PROVIDER, // a unique identifier for this form
  touchOnBlur: false,
  enableReinitialize: true,
})(AAddProviderForm);

AAddProviderForm = connect((state, { type = "add", provider }) => {
  if (type === "add") return null;

  const { Name, Email, Address, PhoneNumber, TIN } = provider;

  return {
    initialValues: {
      name: Name,
      email: Email,
      address: Address,
      phoneNumber: PhoneNumber,
      TIN: TIN,
    },
  };
}, null)(AAddProviderForm);

export default AAddProviderForm;
