import React from "react";
import "./Login.scss";
import CLoginForm from "./CLoginForm";
import { useDispatch } from "react-redux";
import { ACTION_LOGIN } from "state/reducers/cAuthReducer";
import { Link } from "react-router-dom";
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
          <Link to="/register">Đăng ký mới</Link>
          {"  hoặc  "}
          <Link to="/forget-password">Quên mật khẩu?</Link>
        </div>
      </div>
    </div>
  );
};

export default CLogin;
