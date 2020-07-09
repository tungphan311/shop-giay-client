import React, { Component } from "react";
import AInput from "Components/Admin/AInput/input";
import { Field, reduxForm, FieldArray } from "redux-form";
import { FORM_KEY_ADDACCOUNT } from "state/reducers/formReducer";
import AMultiSelect from "Components/Admin/ProductSelect/MultiSelect";
import { requireForm, matchPassword } from "utils/Validation";
import "./AddAccount.scss";
import { connect } from "react-redux";
class AAddAccountForm extends Component {
  render() {
    const { handleSubmit, type } = this.props;
    const roles = [
      {
        value: 1,
        label: "Nhân viên",
      },
      { value: 2, label: "Quản lý" },
    ];
    return (
      <form className="AAddAccountForm" onSubmit={handleSubmit}>
        <div className="card mt-5">
          <div className="card-body">
            <div className="card-title">Thêm tài khoản</div>
            <Field
              label="Tên"
              name="name"
              validate={[requireForm]}
              component={AInput}
            />
            <Field
              label="Email"
              name="email"
              validate={[requireForm]}
              component={AInput}
            />
            <Field
              label="Số điện thoại"
              name="phoneNumber"
              validate={[requireForm]}
              component={AInput}
            />
            <Field
              className="pt-3"
              isMulti={false}
              label="Chức vụ"
              name="roleId"
              type="text"
              defaultValue={roles[0]}
              options={roles}
              validate={[requireForm]}
              component={AMultiSelect}
              placeholder="Chọn Chức Vụ"
            />
            <Field
              label="Tên tài khoản"
              placehoder="Tên tài khoản..."
              name="userName"
              validate={[requireForm]}
              component={AInput}
            />
            {type === "edit" ? undefined : (
              <div>
                <Field
                  label="Mật khẩu"
                  type="password"
                  name="password"
                  validate={[requireForm]}
                  component={AInput}
                />
                <Field
                  type="password"
                  label="Xác nhận mật khẩu"
                  name="confirmPassword"
                  validate={[requireForm, matchPassword]}
                  component={AInput}
                />
              </div>
            )}
          </div>
          <div className="card-action">
            <button class="btn btn-success block" type="submit">
              {type === "edit" ? "Thay Đổi" : "Thêm Mới"}
            </button>
          </div>
        </div>
      </form>
    );
  }
}

AAddAccountForm = reduxForm({
  form: FORM_KEY_ADDACCOUNT, // a unique identifier for this form
  destroyOnUnmount: false,
  touchOnBlur: false,
  keepDirtyOnReinitialize: true,
  enableReinitialize: true,
})(AAddAccountForm);

export default connect((state, props) => {
  const data = state.aAccount.accountEdit;
  if (props.type === "edit") {
    return {
      initialValues: {
        name: data.Name,
        userName: data.Username,
        roleId: {
          value: data.Id,
          label: data.Id === 1 ? "Nhân viên" : "Quản lý",
        },
        email: data.Email,
        phoneNumber: data.PhoneNumber,
      },
    };
  } else {
    return {
      initialValues: {},
    };
  }
}, null)(AAddAccountForm);
