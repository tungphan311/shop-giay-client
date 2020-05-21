import React from "react";
import "./Login.scss";
import CLoginForm from "./CLoginForm";
import { useDispatch } from "react-redux";
import { ACTION_LOGIN } from "state/reducers/cAuthReducer";
const CLogin = () => {
  const dispatch = useDispatch();

  return (
    <div className="clientlogin-wrapper d-flex align-items-center justify-content-center text-center">
      <div>
        <img
          className="big-logo"
          src="/images/shopgiay.png"
          alt=""
          style={{ maxWidth: "30%" }}
        />
        <CLoginForm onSubmit={() => dispatch({ type: ACTION_LOGIN })} />
        <div className="login-meta-data">
          <a href="/register">Đăng ký mới</a>
          {"  hoặc  "}
          <a href="/forget-password">Quên mật khẩu?</a>
        </div>
      </div>
    </div>
  );
};

export default CLogin;
