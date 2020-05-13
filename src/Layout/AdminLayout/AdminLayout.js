import React from "react";
import ASidebar from "../../Components/Admin/Sidebar/Sidebar";
import ANavbar from "../../Components/Admin/Navbar/Navbar";

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
