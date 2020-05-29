import React, { useEffect } from "react";
import "./Shipping.scss";
import CAddressForm from "Components/client/CAddressForm";
import histoty from "state/history";
import CButton from "Components/client/CButton";
import { useDispatch, useSelector } from "react-redux";
import { ACTION_GET_ADDRESSES } from "state/reducers/cCustomerReducer";

const CShipping = () => {
  const handleSubmit = () => {
    histoty.push("/checkout/payment");
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: ACTION_GET_ADDRESSES });
    // eslint-disable-next-line
  }, []);

  const addresses = useSelector((state) => state.ccustomer.addresses);

  return (
    <div className="client-shipping-wrapper">
      <div className="client-shipping-container">
        <div className="checkout-progress">
          <div className="progress-item">
            <div className="progress-label fill-color">Đăng nhập</div>
            <div className="progress-bar-container  fill-full">
              <div className="progress-bar">
                <div className="fill-color" />
              </div>
              <div className="progress-circle">1</div>
            </div>
          </div>
          <div className="progress-item">
            <div className="progress-label fill-color">Địa chỉ giao hàng</div>
            <div className="progress-bar-container fill-half">
              <div className="progress-bar">
                <div className="fill-color"></div>
              </div>
              <div className="progress-circle">2</div>
            </div>
          </div>
          <div className="progress-item">
            <div className="progress-label">Thanh toán & đặt mua</div>
            <div className="progress-bar-container">
              <div className="progress-bar"></div>
              <div className="progress-circle">3</div>
            </div>
          </div>
        </div>
        <div className="address-list">
          {addresses.map((item, index) => (
            <div className="address-item">
              <p className="name">Nguyễn Hoài Thu</p>
              <p className="address">
                Địa chỉ: Đây là địa chỉ Đây là địa chỉ Đây là địa chỉ Đây là địa
                chỉ Đây là địa chỉ Đây là địa chỉ
              </p>
              <p className="phone">Điện thoại: 0123456789</p>
              <div className="action">
                <CButton label="Giao đến địa chỉ này" />
                <CButton label="Sửa" className="edit-address" />
              </div>
            </div>
          ))}
        </div>
        <div className="address-form-wrapper">
          <CAddressForm onSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default CShipping;
