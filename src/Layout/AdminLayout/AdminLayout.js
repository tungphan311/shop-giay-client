import React from "react";
import ASidebar from "Components/Admin/Sidebar/Sidebar";
import ANavbar from "Components/Admin/Navbar/Navbar";
import LoadingScreen from "Components/Admin/Loading/LoadingScreen";
import { useSelector, useDispatch } from "react-redux";

function AdminLayout({ children }) {
  // redux
  const loading = useSelector((state) => state.aLoading.isLoading);

  return (
    <div className="wrapper">
      <ANavbar />
      <ASidebar />
      <div className="main-panel">
        <div className="content">
          <div className="page-inner">
            <LoadingScreen show={loading} />
            {children}
          </div>
          {/* <Footer /> */}
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
