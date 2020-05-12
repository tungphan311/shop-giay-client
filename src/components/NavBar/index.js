import React from "react";
import "./NavBar.scss";
import { NAVBAR_BUTTON_LIST, NAVBAR_ITEM_LIST } from "../../constants";
import Icon from "../Icon";
import NavBarItem from "./NavBarItem";
import NavBarButton from "./NavBarButton";
import UserHoverContent from "./UserHoverContent";
const NavBar = () => {
  const userHoverContent = UserHoverContent({ identity: { name: ">.>" } });
  const infoHoverContent = <div>info</div>;
  const inventoryHoverContent = <div>inventory</div>;

  return (
    <>
      <div className="navbar__container navbar__dummy">
        <a className="navbar__logo" />
      </div>
      <div className="navbar__container">
        <a className="navbar__logo" href="/" />
        {NAVBAR_ITEM_LIST.map((item) => (
          <NavBarItem key={item.label} label={item.label} href={item.href}>
            HOVER CONTENT HERE
          </NavBarItem>
        ))}
        <div className="navbar__button_container">
          {NAVBAR_BUTTON_LIST.map((button) => {
            switch (button.icon) {
              case "user":
                return (
                  <NavBarButton
                    key={button.icon}
                    component={button.hoverComponent}
                    hoverContent={userHoverContent}
                  >
                    <Icon color="white" type={button.icon} />
                  </NavBarButton>
                );
              case "info":
                return (
                  <NavBarButton
                    key={button.icon}
                    component={button.hoverComponent}
                    hoverContent={infoHoverContent}
                  >
                    <Icon color="white" type={button.icon} />
                  </NavBarButton>
                );
              case "inventory":
                return (
                  <NavBarButton
                    key={button.icon}
                    component={button.hoverComponent}
                    hoverContent={inventoryHoverContent}
                  >
                    <Icon color="white" type={button.icon} />
                  </NavBarButton>
                );
              default:
                return (
                  <NavBarButton
                    component={button.hoverComponent}
                    key={button.icon}
                  >
                    <Icon color="white" type={button.icon} />
                  </NavBarButton>
                );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default NavBar;
