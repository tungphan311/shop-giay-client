import React, { Component } from "react";
import ABreadcrumb from "Components/Admin/Breadcrumb/Breadcrumb";
import { connect } from "react-redux";
import "./CustomerDetail.scss";
import { GET_CUSTOMER_BY_ID } from "state/reducers/ACustomerReducer";

const getCustomerInfo = (state) => state.aCustomer.customer;

const formatMoney = (num) => {
  let p = num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  p = p.slice(0, p.length - 3);
  return p;
};

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
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const { customerInfo } = this.props;
    const test = customerInfo.Addresses;
    const nOrders = customerInfo.Orders ? customerInfo.Orders.length : "0";
    const lastOrder = customerInfo.Orders
      ? customerInfo.Orders.reverse()[0].OrderDate
      : "Chưa đặt hàng";
    let total = customerInfo.Orders
      ? customerInfo.Orders.map((e) => e.Total).reduce(reducer)
      : 0;

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
                      <p>Đơn hàng gần nhất </p>
                      <p className="font-weight-bold highlight">
                        {lastOrder.slice(0, 10)}
                      </p>
                      <p className="color-gray-solid"></p>
                    </div>
                    <div className="col-6 col-md-4">
                      <p>Doanh thu tích lũy</p>
                      <p className="font-weight-bold highlight">
                        {formatMoney(total)} VNĐ
                      </p>
                      <p className="color-gray-solid">Số đơn hàng :{nOrders}</p>
                    </div>
                    <div className="col-6 col-md-4">
                      <p>Giá trị trung bình</p>
                      <p className="font-weight-bold highlight">
                        {formatMoney(total / nOrders)} VNĐ
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
                      {customerInfo.Orders.length ? (
                        customerInfo.Orders.map((order) => (
                          <li className="addressListEle">
                            <div className="eleWrap">
                              <div className="col">
                                <h5 id="h5">{`Người nhận : ${order.RecipientName}`}</h5>
                                <p>SĐT : {order.RecipientPhoneNumber}</p>
                                <p>Địa chỉ nhận : {order.DeliverAddress}</p>
                                <p>
                                  Giá trị đơn hàng : {formatMoney(order.Total)}{" "}
                                  Đ
                                </p>
                              </div>
                              <div className="eleTime">
                                <p>Ngày Đặt :{order.OrderDate.slice(0, 10)}</p>
                                <p>
                                  Ngày nhận :{" "}
                                  {order.DeliveryDate
                                    ? order.DeliveryDate
                                    : "Chưa nhận hàng"}
                                </p>
                              </div>
                            </div>
                          </li>
                        ))
                      ) : (
                        <div className="box d-flex align-items-center justify-content-center min-height-500px">
                          <div className="customer--order-empty text-center">
                            <svg
                              height="50px"
                              width="50px"
                              className="svg-next-icon mx-auto color-secondary d-block svg-next-icon-size-10"
                            >
                              <svg
                                id="next-icon-order-empty"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                              >
                                <path d="M1 13h5l1 2h6l1-2h5v6H1z"></path>
                                <path d="M2 18v-4h3.382l.723 1.447c.17.339.516.553.895.553h6c.379 0 .725-.214.895-.553L14.618 14H18v4H2zM19 1a1 1 0 0 1 1 1v17a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h4a1 1 0 0 1 0 2H2v9h4c.379 0 .725.214.895.553L7.618 14h4.764l.723-1.447c.17-.339.516-.553.895-.553h4V3h-3a1 1 0 0 1 0-2h4zM6.293 6.707a.999.999 0 1 1 1.414-1.414L9 6.586V1a1 1 0 0 1 2 0v5.586l1.293-1.293a.999.999 0 1 1 1.414 1.414l-3 3a.997.997 0 0 1-1.414 0l-3-3z"></path>
                              </svg>
                            </svg>
                            <p class="mb-0 mt-2">
                              {" "}
                              Khách hàng này hiện không có đơn hàng.
                            </p>
                          </div>
                        </div>
                      )}
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
