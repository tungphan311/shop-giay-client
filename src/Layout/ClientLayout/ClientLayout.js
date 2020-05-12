import React from "react";
import Footer from "components/Footer";
import NavBar from "components/NavBar";

function ClientLayout({ children }) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}

export default ClientLayout;
