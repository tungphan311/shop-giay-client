import React, { useEffect, useState } from "react";
import { cGetCustomerInfo } from "services/cCustomerService";
import "./CProfile.scss";
import { Button, Form, Col, Row } from "react-bootstrap/";
import { phoneNumber, validEmail } from "../../../utils/Validation";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UPDATE_INFO } from "state/reducers/cCustomerReducer";

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
  const [nameErr, setNameErr] = useState(null);
  const [emailErr, setEmailErr] = useState(null);
  const [phoneErr, setPhoneErr] = useState(null);

  const dispatch = useDispatch();

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

  const handleInputChange = (e) => {
    const name = e.target.name;
    const state = { ...userInfo };

    state[name] = e.target.value;
    setUserInfo(state);
  };

  const validData = () => {
    if (!userInfo.Name) {
      setNameErr("Đây là trường bắt buộc, vui lòng không bỏ trống");
    } else {
      setNameErr(null);
    }

    if (!userInfo.email) {
      setNameErr("Đây là trường bắt buộc, vui lòng không bỏ trống");
    } else {
      if (!validEmail(userInfo.email)) {
        setEmailErr("Email không hợp lệ");
      } else {
        setEmailErr(null);
      }
    }

    if (!userInfo.phoneNumber) {
      setPhoneErr("Đây là trường bắt buộc, vui lòng không bỏ trống");
    } else {
      if (
        /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/.test(
          userInfo.phoneNumber
        )
      ) {
        setPhoneErr(null);
      } else {
        setPhoneErr("Số điện thoại không hợp lệ");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validData();

    if (nameErr || emailErr || phoneErr) return;

    dispatch({ type: UPDATE_INFO, userInfo });
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
              <Form onSubmit={handleSubmit}>
                <div className="form_container">
                  <Form.Group key="username">
                    <Form.Label>Họ và tên</Form.Label>
                    <Form.Control
                      type="text"
                      name="Name"
                      value={userInfo.Name}
                      onChange={(e) => handleInputChange(e)}
                    />
                    <span className="error" style={{ position: "absolute" }}>
                      {nameErr}
                    </span>
                  </Form.Group>
                  <Form.Group key="email">
                    <Form.Label>Địa chỉ email</Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
                      value={userInfo.email}
                      onChange={(e) => handleInputChange(e)}
                    />
                    <span className="error" style={{ position: "absolute" }}>
                      {emailErr}
                    </span>
                  </Form.Group>
                  <Form.Group key="phoneNumber">
                    <Form.Label>Số điện thoại</Form.Label>
                    <Form.Control
                      type="text"
                      name="phoneNumber"
                      value={userInfo.phoneNumber}
                      onChange={(e) => handleInputChange(e)}
                    />
                    <span className="error" style={{ position: "absolute" }}>
                      {phoneErr}
                    </span>
                  </Form.Group>
                  <Form.Group key="gender">
                    <Form.Label>Giới tính</Form.Label>
                    <Form.Control
                      as="select"
                      value={userInfo.gender}
                      name="gender"
                      onChange={(e) => handleInputChange(e)}
                    >
                      <option value={1}>Nam</option>
                      <option value={2}>Nữ</option>
                    </Form.Control>
                  </Form.Group>
                  <div className="col-sm-12 text-center">
                    <button type="submit" className="btn btn-warning">
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
