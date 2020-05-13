import React from "react";

function AShortcuts() {
  return (
    <li className="nav-item dropdown hidden-caret">
      <a
        className="nav-link"
        data-toggle="dropdown"
        href="#"
        aria-expanded="false"
      >
        <i className="fas fa-layer-group"></i>
      </a>
      <div className="dropdown-menu quick-actions quick-actions-info animated fadeIn">
        <div className="quick-actions-header">
          <span className="title mb-1">Thao tác nhanh</span>
          <span className="subtitle op-8">Shortcuts</span>
        </div>
        <div className="quick-actions-scroll scrollbar-outer">
          <div className="quick-actions-items">
            <div className="row m-0">
              <a className="col-6 col-md-4 p-0" href="/sell-courses">
                <div className="quick-actions-item">
                  <i className="flaticon-file"></i>
                  <span className="text">Đăng ký gói tập</span>
                </div>
              </a>
              <a className="col-6 col-md-4 p-0" href="/staffs/add">
                <div className="quick-actions-item">
                  <i className="flaticon-file-1"></i>
                  <span className="text">Thêm nhân viên mới</span>
                </div>
              </a>
              <a className="col-6 col-md-4 p-0" href="/members/add">
                <div className="quick-actions-item">
                  <i className="flaticon-database"></i>
                  <span className="text">Thêm hội viên mới</span>
                </div>
              </a>
              <a className="col-6 col-md-4 p-0" href="/courses/add">
                <div className="quick-actions-item">
                  <i className="flaticon-pen"></i>
                  <span className="text">Thêm gói tập mới</span>
                </div>
              </a>
              <a className="col-6 col-md-4 p-0" href="/equipments/add">
                <div className="quick-actions-item">
                  <i className="flaticon-interface-1"></i>
                  <span className="text">Nhập thiết bị mới</span>
                </div>
              </a>
              <a className="col-6 col-md-4 p-0" href="/invoices">
                <div className="quick-actions-item">
                  <i className="flaticon-list"></i>
                  <span className="text">Tra cứu hoá đơn</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default AShortcuts;
