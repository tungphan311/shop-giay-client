import React from "react";
import Footer from "components/Footer";

function ClientLayout({ children }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}

export default ClientLayout;
