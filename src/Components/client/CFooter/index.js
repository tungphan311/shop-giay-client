import React from "react";
import "./Footer.scss";
import { Container, Row, Col } from "react-bootstrap";
import { SHOP_NAME } from "constants/index.js";
import { Link } from "react-router-dom";
const CFooter = () => (
  <Container fluid className="footer">
    <Row>
      <Col md="3" className="sec-search">
        <Row className="center">
          <img alt="store" src="/svg/Store.svg" />
        </Row>
        <div className="btn btn-search-shop" href="#">
          TÌM CỬA HÀNG
        </div>
      </Col>
      <Col md="9" className="sec-cont">
        <Row className="sec-cont-menu">
          <Col md="3">
            <Link to="/#">
              <h4>SẢN PHẨM</h4>
            </Link>
            <ul>
              <li>
                <Link to="/#">Giày Nam</Link>
              </li>
              <li>
                <Link to="/#">Giày Nữ</Link>
              </li>
            </ul>
          </Col>
          <Col md="3">
            <Link to="/#">
              <h4>VỀ CÔNG TY</h4>
            </Link>
            <ul>
              <li>
                <Link to="/#">Tuyển dụng</Link>
              </li>
              <li>
                <Link to="/#">Liên hệ nhượng quyền</Link>
              </li>
              <li>
                <Link to="/#">Về {SHOP_NAME}</Link>
              </li>
            </ul>
          </Col>
          <Col md="3">
            <Link to="/#">
              <h4>HỖ TRỢ</h4>
            </Link>
            <ul>
              <li>
                <Link to="/#">FAQs</Link>
              </li>
              <li>
                <Link to="/#">Bảo mật thông tin</Link>
              </li>
              <li>
                <Link to="/#">Chính sách chung</Link>
              </li>
              <li>
                <Link to="/#">Tra cứu đơn hàng</Link>
              </li>
            </ul>
          </Col>
          <Col md="3">
            <Link to="/#">
              <h4>LIÊN HỆ</h4>
            </Link>
            <ul>
              <li>
                <Link to="/#">Email góp ý</Link>
              </li>
              <li>
                <Link to="/#">Hotline</Link>
              </li>
              <li>
                <Link to="/#">0123 456 789</Link>
              </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col md="3">
            <h4>{SHOP_NAME} SOCIAL</h4>
            <Link to="https://www.facebook.com/">
              <img alt="facebook" src="/svg/icon_facebook.svg" />
            </Link>
            &nbsp;
            <Link to="https://www.instagram.com">
              <img alt="instagram" src="/svg/icon_instagram.svg" />
            </Link>
            &nbsp;
            <Link to="https://www.youtube.com/">
              <img alt="youtube" src="/svg/icon_youtube.svg" />
            </Link>
          </Col>
          <Col md="3">
            <h4>ĐĂNG KÝ NHẬN MAIL</h4>
            <div className="form-group subscribe-group">
              <input
                type="email"
                className="form-control inputReceiveMail"
                id="inputRecieveMail"
              />
              <Link to="/#" className="subscribe">
                <img alt="subscribe" src="/images/arrow_right.jpg" />
              </Link>
            </div>
          </Col>
          <Col md="6" className="logo-footer">
            <Link to="/#">
              <img alt="logo" src="/images/logo-placeholder.png" />
            </Link>
          </Col>
        </Row>
        <Row>
          <Col md="3" className="icon-bct">
            <Link to="/#">
              <img alt="bct" src="/images/icon_bocongthuong.png" />
            </Link>
          </Col>
          <Col md="9" className="copyright">
            Copyright © {new Date().getFullYear()} {SHOP_NAME}. All rights
            reserved.
          </Col>
        </Row>
      </Col>
    </Row>
  </Container>
);

export default CFooter;
