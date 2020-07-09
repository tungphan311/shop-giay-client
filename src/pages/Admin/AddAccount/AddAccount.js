import React from "react";

import { useDispatch } from "react-redux";
import ABreadcrumb from "Components/Admin/Breadcrumb/Breadcrumb";
import "./AddAccount.scss";

import AAddAccountForm from "Components/Admin/Form/AddAccount/AddAccount";
import { ADD_ACCOUNT } from "state/reducers/AAccountReducer";

function AAddAccount() {
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch({ type: ADD_ACCOUNT });
  };
  return (
    <div>
      <ABreadcrumb title="Cập nhật thông tin giày" list={BREADCRUMB} />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <AAddAccountForm type="add" onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}
const BREADCRUMB = [{ link: "/admin/account", name: "Quản Tài Khoản" }];
export default AAddAccount;
