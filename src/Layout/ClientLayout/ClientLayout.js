import React from "react";
import CFooter from "Components/client/CFooter";
import CNavBar from "Components/client/CNavBar";
import "./ClientLayout.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ClientLayout({ children }) {
  return (
    <>
      <ToastContainer
        enableMultiContainer
        position="bottom-right"
        closeButton={false}
        draggable
        hideProgressBar
        newestOnTop
        autoClose={3000}
      />
      <CNavBar />
      {children}
      <CFooter />
    </>
  );
}

export default ClientLayout;
