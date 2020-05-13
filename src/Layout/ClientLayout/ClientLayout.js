import React from "react";
import CFooter from "components/CFooter";
import CNavBar from "components/CNavBar";
import "./ClientLayout.scss";

function ClientLayout({ children }) {
  return (
    <>
      <CNavBar />
      {children}
      <CFooter />
    </>
  );
}

export default ClientLayout;
