import React from "react";
import "./Footer.scss";
import { Container, Row, Col } from "react-bootstrap";
import { SHOP_NAME } from "constants/index.js";
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
            <a href="/#">
              <h4>SẢN PHẨM</h4>
            </a>
            <ul>
              <li>
                <a href="/#">Giày Nam</a>
              </li>
              <li>
                <a href="/#">Giày Nữ</a>
              </li>
            </ul>
          </Col>
          <Col md="3">
            <a href="/#">
              <h4>VỀ CÔNG TY</h4>
            </a>
            <ul>
              <li>
                <a href="/#">Tuyển dụng</a>
              </li>
              <li>
                <a href="/#">Liên hệ nhượng quyền</a>
              </li>
              <li>
                <a href="/#">Về {SHOP_NAME}</a>
              </li>
            </ul>
          </Col>
          <Col md="3">
            <a href="/#">
              <h4>HỖ TRỢ</h4>
            </a>
            <ul>
              <li>
                <a href="/#">FAQs</a>
              </li>
              <li>
                <a href="/#">Bảo mật thông tin</a>
              </li>
              <li>
                <a href="/#">Chính sách chung</a>
              </li>
              <li>
                <a href="/#">Tra cứu đơn hàng</a>
              </li>
            </ul>
          </Col>
          <Col md="3">
            <a href="/#">
              <h4>LIÊN HỆ</h4>
            </a>
            <ul>
              <li>
                <a href="/#">Email góp ý</a>
              </li>
              <li>
                <a href="/#">Hotline</a>
              </li>
              <li>
                <a href="/#">0123 456 789</a>
              </li>
            </ul>
          </Col>
        </Row>
        <Row>
          <Col md="3">
            <h4>{SHOP_NAME} SOCIAL</h4>
            <a href="https://www.facebook.com/">
              <img alt="facebook" src="/svg/icon_facebook.svg" />
            </a>
            &nbsp;
            <a href="https://www.instagram.com">
              <img alt="instagram" src="/svg/icon_instagram.svg" />
            </a>
            &nbsp;
            <a href="https://www.youtube.com/">
              <img alt="youtube" src="/svg/icon_youtube.svg" />
            </a>
          </Col>
          <Col md="3">
            <h4>ĐĂNG KÝ NHẬN MAIL</h4>
            <div className="form-group subscribe-group">
              <input
                type="email"
                className="form-control inputReceiveMail"
                id="inputRecieveMail"
              />
              <a href="/#" className="subscribe">
                <img alt="subscribe" src="/images/arrow_right.jpg" />
              </a>
            </div>
          </Col>
          <Col md="6" className="logo-footer">
            <a href="/#">
              <img alt="logo" src="/images/logo-placeholder.png" />
            </a>
          </Col>
        </Row>
        <Row>
          <Col md="3" className="icon-bct">
            <a href="/#">
              <img alt="bct" src="/images/icon_bocongthuong.png" />
            </a>
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
