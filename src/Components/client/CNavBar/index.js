import React, { useState, useEffect } from "react";
import "./NavBar.scss";
import { NAVBAR_BUTTON_LIST, NAVBAR_ITEM_LIST } from "constants/index.js";
import CNavBarItem from "./CNavBarItem";
import CUserHoverContent from "./CUserHoverContent";
import CNavBarButton from "./CNavBarButton";
import { useDispatch, useSelector } from "react-redux";
import { ACTION_LOGOUT } from "state/reducers/cAuthReducer";
import { Link } from "react-router-dom";
import CLogo from "Components/client/CNavBar/Logo/Logo";
import SearchHoverContainer from "Components/client/CNavBar/CSearchHoverContainer/index";
import qs from "query-string";

const CNavBar = () => {
  const [key, setKey] = useState(null);

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

  useEffect(() => {
    const search = window.location.search;
    const { q } = qs.parse(search);

    setKey(q);
  }, []);

  return (
    <div id="ss--client--header">
      <header className="header header--inline" role="banner">
        {/* <div className="navbar__container navbar__dummy">
          <div className="navbar__logo" />
        </div> */}
        <div className="navbar__container">
          <div className="header__inner">
            <CLogo />
            <SearchHoverContainer text={key} />
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
                    return null;
                }
              })}
            </div>
          </div>
        </div>
      </header>
      <nav className="nav--bar" style={{ zIndex: "0" }}>
        <div className="nav--bar__inner">
          <div className="navbar__container">
            <ul
              className="nav--bar__linklist list--unstyled"
              style={{ textAlign: "center" }}
            >
              {NAVBAR_ITEM_LIST.map((item) => (
                <CNavBarItem
                  key={item.label}
                  label={item.label}
                  href={item.href}
                />
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default CNavBar;
