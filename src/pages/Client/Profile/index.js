import React, { useEffect, useState } from "react";
import { cGetCustomerInfo } from "services/cCustomerService";
import "./CProfile.scss";
import { Button, Form, Col, Row } from "react-bootstrap/";
import { phoneNumber } from "../../../utils/Validation";
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
  });

  return (
    <>
      <div className="d-flex" id="wrapper">
        <div className="bg-dark" id="sidebar-wrapper">
          <div className="sidebar__container">
            <div className="sidebar-heading">USER</div>
            <div className="list-group list-group-flush">
              <a
                key="all"
                href="/#/"
                className="list-group-item list-group-item-action bg-dark selected"
              >
                Update user info
              </a>
              <a
                key="all"
                href="/#/"
                className="list-group-item list-group-item-action bg-dark"
              >
                Change password
              </a>
            </div>
          </div>
        </div>
        <div className="page-content-wrapper">
          <div className="content">
            <Form>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Họ và tên</Form.Label>
                <Form.Control type="name" placeholder={userInfo.Name} />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Địa chỉ email</Form.Label>
                <Form.Control type="email" placeholder={userInfo.email} />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Số điện thoại</Form.Label>
                <Form.Control type="email" placeholder={userInfo.phoneNumber} />
              </Form.Group>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Giới tính</Form.Label>
                <Form.Control as="select">
                  <option>Nam</option>
                  <option>Nữ</option>
                  <option>Không xác định</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CUserProfile;
