import React from "react";
import ALoginInput from "Components/Admin/Input/Input";
import "./AdminLogin.scss";
import { connect } from "react-redux";
import { LOGIN } from "state/reducers/AAuthReducer";

const mapDispatchToProps = (dispatch) => ({
  login: (username, password) => dispatch({ type: LOGIN, username, password }),
});

function AdminLogin({ login }) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const username = e.target.username.value;
    const password = e.target.password.value;

    login(username, password);
  };

  return (
    <div className="login-wrapper d-flex align-items-center justify-content-center text-center">
      <div className="background-shape"></div>
      <div className="container">
        <img
          className="big-logo"
          src="/images/shopgiay.png"
          alt=""
          style={{ maxWidth: "30%" }}
        />
        <div className="register-form mt-5 px-4">
          <form onSubmit={handleSubmit}>
            <ALoginInput
              label="Tên đăng nhập"
              id="username"
              placeholder="info@example.com"
              icon="icon-user"
            />
            <ALoginInput
              label="Mật khẩu"
              id="password"
              inputType="password"
              placeholder="********************"
              icon="icon-lock"
            />
            <button type="submit" className="btn btn-success btn-lg w-100">
              Đăng nhập
            </button>
          </form>
        </div>
        <div className="login-meta-data">
          <a
            className="forgot-password d-block mt-3 mb-1"
            href="/admin/forget-password"
          >
            Quên mật khẩu?
          </a>
        </div>
      </div>
    </div>
  );
}

export default connect(null, mapDispatchToProps)(AdminLogin);
