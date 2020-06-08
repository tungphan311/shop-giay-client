import React from "react";
import CFooter from "Components/client/CFooter";
import CNavBar from "Components/client/CNavBar";
import "./ClientLayout.scss";
import "react-toastify/dist/ReactToastify.css";

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
