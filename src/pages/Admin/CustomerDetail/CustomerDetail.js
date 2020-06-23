import React, { Component } from "react";
import ABreadcrumb from "Components/Admin/Breadcrumb/Breadcrumb";
import { connect } from "react-redux";
import "./CustomerDetail.scss";
import { GET_CUSTOMER_BY_ID } from "state/reducers/ACustomerReducer";

const getCustomerInfo = (state) => state.aCustomer.customer;

const mapStateToProps = (state) => {
  return {
    customerInfo: getCustomerInfo(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  getCustomer: (id) => dispatch({ type: GET_CUSTOMER_BY_ID, id }),
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
      getCustomer,
      match: {
        params: { id },
      },
    } = this.props;
    getCustomer(id);
  };

  render() {
    const { customerInfo } = this.props;
    const test = customerInfo.Addresses;
    if (test) {
      console.log(test[0]);
    }
    const reptiles = [
      {
        name: "Tung",
        ma: "F120934809",
        gia: "123,423,244 đ",
        tg: new Date().toISOString().slice(0, 10),
      },
      {
        name: "Tung",
        ma: "F120934809",
        gia: "123,423,244 đ",
        tg: new Date().toISOString().slice(0, 10),
      },
      {
        name: "Tung",
        ma: "F120934809",
        gia: "123,423,244 đ",
        tg: new Date().toISOString().slice(0, 10),
      },
    ];

    return (
      <div className="ACustomerDetail">
        <ABreadcrumb title="Thông tin khách hàng" list={BREADCRUMB} />
        <div className="row">
          <div className="col-lg-8 col-12">
            <div className="card">
              <div className="card-body">
                <div className="card-title">
                  <h4 id="h4">{customerInfo.Name}</h4>
                </div>
                <div className="infoBody">
                  <div className="row">
                    <div className="col-6 col-md-4">
                      <p>Đơn hàng gần nhất</p>
                      <p className="font-weight-bold highlight">
                        {new Date().toISOString().slice(0, 10)}
                      </p>
                      <p className="color-gray-solid"></p>
                    </div>
                    <div className="col-6 col-md-4">
                      <p>Doanh thu tích lũy</p>
                      <p className="font-weight-bold highlight">
                        354,343,232 đ
                      </p>
                      <p className="color-gray-solid">12 Đơn hàng</p>
                    </div>
                    <div className="col-6 col-md-4">
                      <p>Giá trị trung bình</p>
                      <p className="font-weight-bold highlight">
                        354,343,232 đ
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <div className="card-title">
                  <div>
                    <h4 id="h4">Đơn hàng</h4>
                    <ul className="addressList">
                      {reptiles.map((reptile) => (
                        <li className="addressListEle">
                          <div className="eleWrap">
                            <div className="col">
                              <h5 id="h5">{reptile.name}</h5>
                              <p>{reptile.ma}</p>
                              <p>{reptile.gia}</p>
                            </div>
                            <div className="eleTime">
                              <p>{reptile.tg}</p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <div className="card-title">
                  <h4 id="h4">Thông tin liên hệ</h4>
                </div>
                <p>Emai : {customerInfo.Email}</p>
                <p>SĐT : {customerInfo.PhoneNumber}</p>
                <div className="card-title">
                  <h4 id="h4">Địa chỉ mặc định</h4>
                  <p className="font-weight-bold table-break-word">
                    Người nhận : {customerInfo.Name}
                  </p>
                  <p>Địa chỉ : {test ? test[0].Street : ""} </p>
                  <p>Phường : {test ? test[0].Ward : ""}</p>
                  <p>Quận : {test ? test[0].District : ""}</p>
                  <p>Thành phố : {test ? test[0].City : ""}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const BREADCRUMB = [{ link: "/admin/customer", name: "Quản lý khách hàng" }];

export default connect(mapStateToProps, mapDispatchToProps)(ACustomerDetail);
