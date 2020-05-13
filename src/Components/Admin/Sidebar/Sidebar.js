import React from "react";
import { SIDEBAR_LIST } from "../../../constants";
import SidebarItem from "./SidebarItem";

function ASidebar() {
  return (
    <div className="sidebar sidebar-style-2">
      <div className="sidebar-wrapper scrollbar scrollbar-inner">
        <div className="sidebar-content">
          <ul className="nav nav-primary">
            {SIDEBAR_LIST.map((item) => (
              <SidebarItem key={item.id} item={item} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ASidebar;
