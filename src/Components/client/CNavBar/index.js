import React from "react";
import "./NavBar.scss";
import { NAVBAR_BUTTON_LIST, NAVBAR_ITEM_LIST } from "constants/index.js";
import CIcon from "Components/client/CIcon";
import CNavBarItem from "./CNavBarItem";
import CNavBarButton from "./CNavBarButton";
import CUserHoverContent from "./CUserHoverContent";
import { require } from "utils/index";
const CNavBar = () => {
  const userHoverContent = CUserHoverContent({ identity: { name: ">.>" } });
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
                    component={button.hoverComponent}
                    hoverContent={infoHoverContent}
                  >
                    <CIcon color="white" type={button.icon} />
                  </CNavBarButton>
                );
              case "inventory":
                return (
                  <CNavBarButton
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
