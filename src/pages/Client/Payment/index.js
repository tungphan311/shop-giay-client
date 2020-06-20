import React, { useEffect, useState } from "react";
import "./Payment.scss";
import CButton from "Components/client/CButton";
import history from "state/history";
import { vietNamCurrency } from "utils";
import { useSelector, useDispatch } from "react-redux";
import { ACTION_GET_CART_ITEMS } from "state/reducers/cCartReducer";
import { ACTION_PLACE_ORDER } from "state/reducers/cOrderReducer";
const Payment = () => {
  const {
    recipientName: fullName,
    street,
    ward,
    district,
    city,
    recipientPhoneNumber: phoneNumber,
  } = useSelector((state) => state.corder.address);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!fullName) history.push("/checkout/shipping");
    else {
      dispatch({ type: ACTION_GET_CART_ITEMS });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addressString = `${street}, ${ward}, ${district}, ${city}`;

  const cartItems = useSelector((state) => state.ccart.cartItems);

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [shippingMethod, setShippingMethod] = useState("normal");

  return (
    <div className="client-payment-wrapper">
      <div className="client-payment-container">
        <div className="checkout-progress">
          <div className="progress-item">
            <div className="progress-label fill-color">Đăng nhập</div>
            <div className="progress-bar-container fill-full">
              <div className="progress-bar">
                <div className="fill-color" />
              </div>
              <div className="progress-circle">1</div>
            </div>
          </div>
          <div className="progress-item">
            <div className="progress-label fill-color">Địa chỉ giao hàng</div>
            <div className="progress-bar-container fill-full">
              <div className="progress-bar">
                <div className="fill-color"></div>
              </div>
              <div className="progress-circle">2</div>
            </div>
          </div>
          <div className="progress-item">
            <div className="progress-label fill-color">
              Thanh toán & đặt mua
            </div>
            <div className="progress-bar-container fill-full">
              <div className="progress-bar">
                <div className="fill-color"></div>
              </div>
              <div className="progress-circle">3</div>
            </div>
          </div>
        </div>
        <div className="payment-content">
          <div className="left-container">
            <div className="title">1. Chọn hình thức giao hàng</div>
            <div className="content-container">
              <ul className="list">
                <div className="list-item">
                  <label>
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="normal"
                      checked={"normal" === shippingMethod}
                      onChange={(e) => setShippingMethod(e.target.value)}
                    />
                    <span className="radio-fake"></span>
                    <span className="label">Giao hàng tiêu chuẩn</span>
                  </label>
                </div>
                {/* <div className="list-item">
                  <label>
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="fast"
                      checked={"fast" === shippingMethod}
                      onChange={(e) => setShippingMethod(e.target.value)}
                    />
                    <span className="radio-fake"></span>
                    <span className="label">Giao hàng nhanh</span>
                  </label>
                </div> */}
              </ul>
            </div>
            <div className="title">2. Chọn hình thức thanh toán</div>
            <div className="content-container">
              <ul className="list">
                <div className="list-item">
                  <label>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={"cod" === paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="radio-fake"></span>
                    <span className="label">
                      Thanh toán tiền mặt khi nhận hàng
                    </span>
                  </label>
                </div>
                <div className="list-item">
                  <label>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="momo"
                      disabled
                      checked={"momo" === paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span className="radio-fake"></span>
                    <span className="label">
                      Thanh toán bằng ví Momo (trong quá trình phát triển)
                    </span>
                  </label>
                </div>
              </ul>
            </div>
            <CButton
              onClick={() =>
                dispatch({
                  type: ACTION_PLACE_ORDER,
                  payload: { shippingMethod, paymentMethod },
                })
              }
              className="order-button"
              label="Đặt đơn hàng"
            />
          </div>
          <div className="right-container">
            <div className="content-section">
              <div className="title">Địa chỉ giao hàng</div>
              <CButton
                onClick={() => history.push("/checkout/shipping")}
                className="edit-button"
                label="Sửa"
              />
              <div className="content">
                <span className="name">{fullName}</span>
                <span className="street">{addressString}</span>
                <span className="phone">Điện thoại: {phoneNumber}</span>
              </div>
            </div>

            <div className="content-section">
              <div className="title">
                Đơn hàng ({cartItems.length} sản phẩm)
              </div>
              <CButton
                onClick={() => history.push("/cart")}
                className="edit-button"
                label="Sửa"
              />
              <div className="content">
                {cartItems.map(
                  ({ stockId, name, sizeName, price, quantity }) => (
                    <div key={stockId} className="order-item">
                      <div className="info">
                        <strong className="qty">{quantity} x</strong>
                        <a
                          href={`/products/${stockId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="product-name"
                        >
                          {name} size {sizeName}{" "}
                        </a>
                      </div>
                      <div className="price">
                        {vietNamCurrency(price * quantity)}
                      </div>
                    </div>
                  )
                )}
              </div>
              <div className="content">
                <div className="total">
                  <div className="name">Thành tiền: </div>
                  <div className="value">
                    {vietNamCurrency(
                      cartItems.reduce(
                        (total, current) =>
                          total + current.quantity * current.price,
                        0
                      )
                    )}
                    <i>(Đã bao gồm VAT nếu có)</i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
