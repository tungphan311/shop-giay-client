import React from "react";

import { useDispatch } from "react-redux";

import "./AddAccount.scss";

import AAddAccountForm from "Components/Admin/Form/AddAccount/AddAccount";
import { ADD_ACCOUNT } from "state/reducers/AAccountReducer";

function AAddAccount() {
  const dispatch = useDispatch();
  const handleSubmit = () => {
    console.log("a");
    dispatch({ type: ADD_ACCOUNT });
  };
  return <AAddAccountForm onSubmit={handleSubmit} />;
}
export default AAddAccount;
