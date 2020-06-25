import React from "react";
import "./Shortcuts.scss";
import { Link } from "react-router-dom";

function AShortcuts() {
  return (
    <li className="nav-item dropdown hidden-caret">
      <button className="nav-link" data-toggle="dropdown" aria-expanded="false">
        <i className="fas fa-layer-group"></i>
      </button>
      <div className="dropdown-menu quick-actions quick-actions-info animated fadeIn">
        <div className="quick-actions-header">
          <span className="title mb-1">Thao tác nhanh</span>
          <span className="subtitle op-8">Shortcuts</span>
        </div>
        <div className="quick-actions-scroll scrollbar-outer">
          <div className="quick-actions-items">
            <div className="row m-0">
              <Link className="col-6 col-md-4 p-0" to="/admin">
                <div className="quick-actions-item">
                  <i className="flaticon-file"></i>
                  <span className="text">Trang chủ</span>
                </div>
              </Link>
              <Link className="col-6 col-md-4 p-0" to="/admin/orders">
                <div className="quick-actions-item">
                  <i className="flaticon-file-1"></i>
                  <span className="text">Danh sách đơn hàng</span>
                </div>
              </Link>
              <Link className="col-6 col-md-4 p-0" to="/admin/shoes">
                <div className="quick-actions-item">
                  <i className="flaticon-database"></i>
                  <span className="text">Danh sách sản phẩm</span>
                </div>
              </Link>
              <Link className="col-6 col-md-4 p-0" to="/admin/shoes-add">
                <div className="quick-actions-item">
                  <i className="flaticon-pen"></i>
                  <span className="text">Thêm sản phẩm mới</span>
                </div>
              </Link>
              <Link className="col-6 col-md-4 p-0" to="/admin/shoes-import">
                <div className="quick-actions-item">
                  <i className="flaticon-interface-1"></i>
                  <span className="text">Nhập đơn hàng mới</span>
                </div>
              </Link>
              <Link className="col-6 col-md-4 p-0" to="/admin/promotion">
                <div className="quick-actions-item">
                  <i className="flaticon-list"></i>
                  <span className="text">Khuyến mãi</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default AShortcuts;
