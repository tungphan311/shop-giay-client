import React, { useEffect, useState } from "react";
import { cGetCustomerInfo } from "services/cCustomerService";
import "./CUpdatePassword.scss";
import { Button, Form, Col, Row } from "react-bootstrap/";
import { phoneNumber } from "../../../utils/Validation";
import { Link } from "react-router-dom";
const initalState = [
  {
    Name: "",
    dateOfBirth: "",
    email: "",
    gender: 0,
    id: 0,
    phoneNumber: "",
  },
];

const CUpdatePassword = () => {
  const [userInfo, setUserInfo] = useState(initalState);
  useEffect(() => {
    const cur_user = cGetCustomerInfo().then((res) =>
      JSON.parse(res.data.data)
    );

    Promise.all([cur_user])
      .then(([currentUser]) => {
        setUserInfo(currentUser);
        console.log(currentUser);
      })
      .catch((error) => console.log(error));
  }, []);

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
              <Form>
                <div className="form_container">
                  <Form.Group
                    controlId="exampleForm.ControlInput1"
                    key="current_pw"
                  >
                    <Form.Label>Mật khẩu hiện tại</Form.Label>
                    <Form.Control type="password" placeholder="*******" />
                  </Form.Group>
                  <Form.Group
                    controlId="exampleForm.ControlInput1"
                    key="new_pw"
                  >
                    <Form.Label>Mật khẩu mới</Form.Label>
                    <Form.Control type="password" placeholder="*******" />
                  </Form.Group>
                  <Form.Group
                    controlId="exampleForm.ControlInput1"
                    key="confirm_pw"
                  >
                    <Form.Label>Xác nhận mật khẩu mới</Form.Label>
                    <Form.Control type="password" placeholder="*******" />
                  </Form.Group>

                  <div className="col-sm-12 text-center">
                    <button type="button" className="btn btn-warning">
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
