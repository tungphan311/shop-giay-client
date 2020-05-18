import React from "react";
import "./Login.scss";
import CLoginForm from "./CLoginForm";
import { useDispatch } from "react-redux";
import { ACTION_LOGIN } from "state/reducers/cAuthReducer";
const CLogin = () => {
  const dispatch = useDispatch();

  return (
    <div className="clientlogin-wrapper">
      <CLoginForm onSubmit={() => dispatch({ type: ACTION_LOGIN })} />
    </div>
  );
};

export default CLogin;
