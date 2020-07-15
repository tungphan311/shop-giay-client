import React, { useState } from "react";
import "./CUpdatePassword.scss";
import { Form } from "react-bootstrap/";
import { minLength6, maxLength18 } from "utils/Validation";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CHANGE_PASSWORD } from "state/reducers/cCustomerReducer";

const CUpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [reNewPassword, setReNewPassword] = useState("");
  const [oldPasswordErr, setOldPasswordErr] = useState();
  const [newPasswordErr, setNewPasswordErr] = useState(null);
  const [reNewPasswordErr, setReNewPasswordErr] = useState(null);

  const dispatch = useDispatch();

  const validPassword = (value) => {
    if (minLength6(value) && maxLength18(value)) return true;
    else return false;
  };

  const validData = () => {
    if (validPassword(oldPassword)) {
      setOldPasswordErr(null);
    } else {
      setOldPasswordErr("Mật khẩu phải từ 6 đến 18 ký tự");
    }

    if (validPassword(newPassword)) {
      setNewPasswordErr(null);
    } else {
      setNewPasswordErr("Mật khẩu phải từ 6 đến 18 ký tự");
    }

    if (validPassword(reNewPassword)) {
      if (reNewPassword !== newPassword) {
        setReNewPasswordErr("Mật khẩu không trùng khớp. Vui lòng nhập lại");
      } else {
        setReNewPasswordErr(null);
      }
    } else {
      setReNewPasswordErr("Mật khẩu phải từ 6 đến 18 ký tự");

      if (reNewPassword !== newPassword) {
        setReNewPasswordErr("Mật khẩu không trùng khớp. Vui lòng nhập lại");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validData();

    if (oldPasswordErr || newPasswordErr || reNewPasswordErr) return;

    dispatch({ type: CHANGE_PASSWORD, oldPassword, newPassword });
  };

  return (
    <>
      <div className="main_layout" id="wrapper">
        <div className="body_container">
          <div className="bg-dark" id="sidebar-wrapper">
            <div className="sidebar__container">
              <div className="sidebar-heading">USER</div>
              <div className="list-group list-group-flush">
                <Link
                  key="update"
                  to="/profile/update"
                  className="list-group-item list-group-item-action bg-dark "
                >
                  Cập nhật thông tin cá nhân
                </Link>
                <Link
                  key="changepw"
                  to="/profile/password"
                  className="list-group-item list-group-item-action bg-dark selected"
                >
                  Đổi mật khẩu
                </Link>
              </div>
            </div>
          </div>
          <div className="page-content-wrapper">
            <div className="content">
              <Form onSubmit={handleSubmit}>
                <div className="form_container">
                  <Form.Group controlId="oldPassword" key="current_pw">
                    <Form.Label>Mật khẩu hiện tại</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="*******"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                    <span className="error" style={{ position: "absolute" }}>
                      {oldPasswordErr}
                    </span>
                  </Form.Group>
                  <Form.Group controlId="newPassword" key="new_pw">
                    <Form.Label>Mật khẩu mới</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="*******"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <span className="error" style={{ position: "absolute" }}>
                      {newPasswordErr}
                    </span>
                  </Form.Group>
                  <Form.Group controlId="reNewPassword" key="confirm_pw">
                    <Form.Label>Xác nhận mật khẩu mới</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="*******"
                      value={reNewPassword}
                      onChange={(e) => setReNewPassword(e.target.value)}
                    />
                    <span className="error" style={{ position: "absolute" }}>
                      {reNewPasswordErr}
                    </span>
                  </Form.Group>

                  <div className="col-sm-12 text-center">
                    <button type="submit" className="btn btn-warning">
                      Cập nhật mật khẩu
                    </button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CUpdatePassword;
