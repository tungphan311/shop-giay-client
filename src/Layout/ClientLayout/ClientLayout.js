import React from "react";
import CFooter from "components/client/CFooter";
import CNavBar from "components/client/CNavBar";
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
