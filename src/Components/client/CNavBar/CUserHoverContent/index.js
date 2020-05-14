import React from "react";
import "./UserHoverContent.scss";
import { USER_HOVER_CONTENT } from "constants/index.js";
import CButton from "Components/client/CButton";
const LoggedInUserHoverContent = ({ identity, handleLogout }) => {
  const { name } = identity;
  return (
    <>
      <div className="userhovercontent__row">CHÀO {name}</div>
      <div className="userhovercontent__divider" />
      {USER_HOVER_CONTENT.map((row) => (
        <div key={row.label}>
          <div className="userhovercontent__row">
            <a className="userhovercontent__label" href={row.href}>
              {row.label}
            </a>
          </div>
          <div className="userhovercontent__divider" />
        </div>
      ))}
      <div className="userhovercontent__row">
        <CButton label="ĐĂNG XUẤT" onClick={handleLogout} />
      </div>
    </>
  );
};
const NotLoggedInUserHoverContent = () => (
  <>
    <div className="userhovercontent__row">
      {" "}
      <div className="userhovercontent__title">ĐÃ CÓ TÀI KHOẢN?</div>
      <CButton href="/login" label="ĐĂNG NHẬP NGAY" />
    </div>
    <div className="userhovercontent__divider" />
    <div className="userhovercontent__row">
      {" "}
      <div className="userhovercontent__subtitle">BẠN CHƯA CÓ TÀI KHOẢN?</div>
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
