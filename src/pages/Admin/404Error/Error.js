import React from "react";
import "./Error.scss";
import { Link } from "react-router-dom";

const WRONG = 404;
const UNAUTHORIZED = 401;

function AErrorPage({ code }) {
  return (
    <div className="error--page">
      <section id="error">
        <div className="content">
          <i className="fas fa-exclamation-triangle"></i>
          {code === WRONG && (
            <>
              <h1>404</h1>
              <p>Có lỗi xảy ra! - Đường dẫn không tồn tại</p>
            </>
          )}
          {code === UNAUTHORIZED && (
            <>
              <h1>401 - Unauthorize</h1>
              <p>Bạn không có quyên truy cập vào chức năng này</p>
            </>
          )}
          <Link className="back" to="/admin">
            Về trang chủ
          </Link>
        </div>
      </section>
      <footer>
        <p>
          © 2020 404 Error. All Rights Reserved | Design by{" "}
          <Link className="shoesshop" to="/">
            SSneaker
          </Link>
        </p>
      </footer>
    </div>
  );
}

export default AErrorPage;
