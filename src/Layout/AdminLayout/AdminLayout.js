import React from "react";
import ASidebar from "Components/Admin/Sidebar/Sidebar";
import ANavbar from "Components/Admin/Navbar/Navbar";
import LoadingScreen from "Components/Admin/Loading/LoadingScreen";
import { connect } from "react-redux";
import AErrorPage from "pages/Admin/404Error/Error";

const mapStateToProps = (state) => ({
  loading: state.aLoading.isLoading,
  isAuthorize: state.aLoading.isAuthorize,
});

function AdminLayout({ children, loading, isAuthorize }) {
  return (
    <div className="wrapper">
      <ANavbar />
      <ASidebar />
      <div className="main-panel">
        <div className="content">
          <div className="page-inner">
            <LoadingScreen show={loading} />
            {isAuthorize ? children : <AErrorPage code={401} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default connect(mapStateToProps, null)(AdminLayout);
