import React from "react";
import ASidebar from "components/Admin/Sidebar/Sidebar";
import ANavbar from "components/Admin/Navbar/Navbar";

function AdminLayout({ children }) {
  return (
    <div className="wrapper">
      <ANavbar />
      <ASidebar />
      <div className="main-panel">
        <div className="content">
          <div className="page-inner">{children}</div>
          {/* <Footer /> */}
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
