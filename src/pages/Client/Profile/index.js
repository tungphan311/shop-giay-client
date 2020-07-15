import React, { useEffect, useState } from "react";
import { cGetCustomerInfo } from "services/cCustomerService";
import "./CProfile.scss";
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

const CUserProfile = () => {
  const [userInfo, setUserInfo] = useState(initalState);
  useEffect(() => {
    const cur_user = cGetCustomerInfo().then((res) =>
      JSON.parse(res.data.data)
    );

    Promise.all([cur_user])
      .then(([currentUser]) => {
        setUserInfo(currentUser);
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
                  className="list-group-item list-group-item-action bg-dark selected"
                >
                  Cập nhật thông tin cá nhân
                </Link>
                <Link
                  key="changepw"
                  to="/profile/password"
                  className="list-group-item list-group-item-action bg-dark"
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
                    key="username"
                  >
                    <Form.Label>Họ và tên</Form.Label>
                    <Form.Control type="name" placeholder={userInfo.Name} />
                  </Form.Group>
                  <Form.Group controlId="exampleForm.ControlInput1" key="email">
                    <Form.Label>Địa chỉ email</Form.Label>
                    <Form.Control type="email" placeholder={userInfo.email} />
                  </Form.Group>
                  <Form.Group
                    controlId="exampleForm.ControlInput1"
                    key="phoneNumber"
                  >
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder={userInfo.phoneNumber}
                    />
                  </Form.Group>
                  <Form.Group
                    controlId="exampleForm.ControlSelect1"
                    key="gender"
                  >
                    <Form.Label>Giới tính</Form.Label>
                    <Form.Control as="select">
                      <option>Nam</option>
                      <option>Nữ</option>
                      <option>Không xác định</option>
                    </Form.Control>
                  </Form.Group>
                  <div className="col-sm-12 text-center">
                    <button type="button" className="btn btn-warning">
                      Cập nhật thông tin
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

export default CUserProfile;
