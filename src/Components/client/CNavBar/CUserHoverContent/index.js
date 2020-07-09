import React from "react";
import "./UserHoverContent.scss";
import { USER_HOVER_CONTENT } from "constants/index.js";
import CButton from "Components/client/CButton";
import { Link } from "react-router-dom";

const LoggedInUserHoverContent = ({ identity, handleLogout }) => {
  const { name } = identity;
  return (
    <>
      <div className="userhovercontent__row">CHÀO {name}</div>
      <div className="userhovercontent__divider" />
      {USER_HOVER_CONTENT.map((row) => (
        <div key={row.label}>
          <div className="userhovercontent__row">
            <Link className="userhovercontent__label" to={row.href}>
              {row.label}
            </Link>
          </div>
          <div className="userhovercontent__divider" />
        </div>
      ))}
      <div className="userhovercontent__row">
        <CButton label="ĐĂNG XUẤT" onClick={() => handleLogout()} />
      </div>
    </>
  );
};

const NotLoggedInUserHoverContent = () => (
  <>
    <div className="userhovercontent__row">
      <div className="userhovercontent__title">Đã có tài khoản?</div>
      <CButton
        href="/login"
        label="ĐĂNG NHẬP NGAY"
        event={{
          category: "LOGIN",
          action: "User click button to the login page",
          label: "LOGIN-PAGE",
        }}
      />
    </div>
    <div className="userhovercontent__divider" />
    <div className="userhovercontent__row">
      {" "}
      <div className="userhovercontent__subtitle">Khách hàng mới?</div>
      <CButton href="/signup" label="TẠO TÀI KHOẢN MỚI" />
    </div>
  </>
);

const UserHoverContent = ({ identity, handleLogout }) => (
  <div className="userhovercontent__container">
    {identity ? (
      <LoggedInUserHoverContent {...{ identity, handleLogout }} />
    ) : (
      <NotLoggedInUserHoverContent />
    )}
  </div>
);

export default UserHoverContent;
