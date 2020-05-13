import React from "react";
import ACollapseNavBar from "./CollapseNavbar";
import AExpandNavBar from "./ExpandNavbar";

function ANavbar() {
  return (
    <div className="main-header">
      <ACollapseNavBar />
      <AExpandNavBar />
    </div>
  );
}

export default ANavbar;
