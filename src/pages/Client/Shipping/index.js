import React from "react";
import "./Shipping.scss";
import CAddressForm from "Components/client/CAddressForm";
import histoty from "state/history";

const CShipping = () => {
  const handleSubmit = () => {
    histoty.push("/checkout/payment");
  };
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
        <CAddressForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default CShipping;
