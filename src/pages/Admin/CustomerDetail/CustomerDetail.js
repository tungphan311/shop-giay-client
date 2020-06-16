import React, { Component } from "react";
import ABreadcrumb from "Components/Admin/Breadcrumb/Breadcrumb";
import MultipleForm from "Components/Admin/Form/MultipleForm/MultipleForm";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import "./CustomerDetail.scss";

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  //   getShoes: (id) => dispatch({ type: GET_SHOES_BY_ID, id }),
});

class ACustomerDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
    };
  }
  componentDidMount = () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
  };

  render() {
    return (
      <div className="ACustomerDetail" id="customBox">
        <ABreadcrumb title="Thêm sản phẩm mới" list={BREADCRUMB} />
        <div className="row">
          <div className="col-lg-8 col-12">
            <div className="info">
              <div className="infoHeader">
                <h4>Customer Name</h4>
              </div>
              <div className="infoBody">
                <div className="row">
                  <div className="col-6 col-md-4">Đơn hàng gần nhất</div>
                  <div className="col-6 col-md-4">Doanh thu tích lũy</div>
                  <div className="col-6 col-md-4">Giá trị trung bình</div>
                </div>
              </div>
            </div>
            <div className="info">
              <div className="infoHeader">
                <div className="row">
                  <h4>Đơn hàng</h4>
                  <a>Xem tất cả</a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="info">
              <div className="infoBody">
                <h4>Thông tin liên hệ</h4>
                <p>lvhoang@gmail.com</p>
                <p>abc</p>
                <p>xyz</p>
              </div>
              <div className="infoBody">
                <h4>Địa chỉ mặc định</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const BREADCRUMB = [{ link: "/admin/shoes", name: "Quản lý giày" }];

export default connect(mapStateToProps, mapDispatchToProps)(ACustomerDetail);
