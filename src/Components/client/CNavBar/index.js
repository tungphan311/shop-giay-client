import React from "react";
import "./NavBar.scss";
import { NAVBAR_BUTTON_LIST, NAVBAR_ITEM_LIST } from "constants/index.js";
import CNavBarItem from "./CNavBarItem";
import CUserHoverContent from "./CUserHoverContent";
import CNavBarButton from "./CNavBarButton";
import { useDispatch, useSelector } from "react-redux";
import { ACTION_LOGOUT } from "state/reducers/cAuthReducer";
import { Link } from "react-router-dom";
const CNavBar = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.cauth.username);
  const userInfo = useSelector((state) => state.cauth.userInfo);
  const userHoverContent = CUserHoverContent({
    handleLogout: () => dispatch({ type: ACTION_LOGOUT }),
    identity: userInfo
      ? { name: userInfo.name }
      : username
      ? { name: username }
      : null,
  });

  const cartItems = useSelector((state) => state.ccart.cartItems);

  return (
    <>
      <div className="navbar__container navbar__dummy">
        <div className="navbar__logo" />
      </div>
      <div className="navbar__container">
        {/* eslint-disable-next-line jsx-a11y/anchor-has-content  */}
        <Link className="navbar__logo" href="/" />
        {NAVBAR_ITEM_LIST.map((item) => (
          <CNavBarItem key={item.label} label={item.label} href={item.href} />
        ))}
        <div className="navbar__button_container">
          {NAVBAR_BUTTON_LIST.map((button) => {
            switch (button.icon) {
              case "user":
                return (
                  <CNavBarButton
                    key={button.icon}
                    href={button.href}
                    component={button.hoverComponent}
                    icon={button.icon}
                    hoverContent={userHoverContent}
                  />
                );
              case "inventory":
                return (
                  <CNavBarButton
                    href={button.href}
                    key={button.icon}
                    component={button.hoverComponent}
                    icon={button.icon}
                    floatNumber={cartItems ? cartItems.length : 0}
                  />
                );
              default:
                return (
                  <CNavBarButton
                    href={button.href}
                    component={button.hoverComponent}
                    key={button.icon}
                    icon={button.icon}
                  />
                );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default CNavBar;
