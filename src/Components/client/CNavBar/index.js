import React from "react";
import "./NavBar.scss";
import { NAVBAR_BUTTON_LIST, NAVBAR_ITEM_LIST } from "constants/index.js";
import CIcon from "Components/client/CIcon";
import CNavBarItem from "./CNavBarItem";
import CNavBarButton from "./CNavBarButton";
import CUserHoverContent from "./CUserHoverContent";
import { require } from "utils/index";
import { useDispatch, useSelector } from "react-redux";
import { ACTION_LOGOUT } from "state/reducers/cAuthReducer";
const CNavBar = () => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.cauth.username);
  const userHoverContent = CUserHoverContent({
    handleLogout: () => dispatch({ type: ACTION_LOGOUT }),
    identity: username ? { name: username } : null,
  });
  const infoHoverContent = <div>info</div>;
  const inventoryHoverContent = <div>inventory</div>;

  return (
    <>
      <div className="navbar__container navbar__dummy">
        <a className="navbar__logo" href="/" />
      </div>
      <div className="navbar__container">
        <a className="navbar__logo" href="/" />
        {NAVBAR_ITEM_LIST.map((item) => (
          <CNavBarItem key={item.label} label={item.label} href={item.href}>
            HOVER CONTENT HERE
          </CNavBarItem>
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
                    hoverContent={userHoverContent}
                  >
                    <CIcon color="white" type={button.icon} />
                  </CNavBarButton>
                );
              case "info":
                return (
                  <CNavBarButton
                    key={button.icon}
                    href={button.href}
                    component={button.hoverComponent}
                    hoverContent={infoHoverContent}
                  >
                    <CIcon color="white" type={button.icon} />
                  </CNavBarButton>
                );
              case "inventory":
                return (
                  <CNavBarButton
                    href={button.href}
                    key={button.icon}
                    component={button.hoverComponent}
                    hoverContent={inventoryHoverContent}
                  >
                    <CIcon color="white" type={button.icon} />
                  </CNavBarButton>
                );
              default:
                return (
                  <CNavBarButton
                    href={button.href}
                    component={button.hoverComponent}
                    key={button.icon}
                  >
                    <CIcon color="white" type={button.icon} />
                  </CNavBarButton>
                );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default CNavBar;
