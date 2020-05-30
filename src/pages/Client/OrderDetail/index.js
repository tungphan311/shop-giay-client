import React, { useEffect } from "react";
import "./OrderDetail.scss";
import { useDispatch, useSelector } from "react-redux";
import { ACTION_GET_CART_ITEMS } from "state/reducers/cCartReducer";
import history from "state/history";
import { vietNamCurrency } from "utils";

function OrderDetail({
  match: {
    params: { id },
  },
}) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.ccart.cartItems);
  useEffect(() => {
    dispatch({ type: ACTION_GET_CART_ITEMS });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="orderdetail-wrapper">
      <div className="orderdetail-container">
        <div className="orderdetail-header">Chi tiết đơn hàng #{id}</div>
        <div className="created-date">Ngày đặt hàng: 19:31 21/04/2020</div>
        <div className="orderdetail-info">
          <div>
            <div className="title">Địa chỉ người nhận</div>
            <div className="content">
              <p className="name">NAME HERE</p>
              <p className="address">Địa chỉ: ADDRESS HERE</p>
              <p className="phone">Điện thoại: PHONE NUMBER HERE</p>
            </div>
          </div>
        </div>
        <table className="product-table">
          <thead>
            <tr>
              <td colSpan="2" className="product-name">
                Giày
              </td>
              <td className="product-price">Giá</td>
              <td className="product-qty">Số lượng</td>
              <td className="product-subtotal">Thành tiền</td>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(
              ({ stockId, image, name, sizeName, price, quantity }, index) => (
                <tr
                  key={index}
                  className={`product-table-row-${
                    index % 2 === 1 ? "even" : "odd"
                  }`}
                >
                  <td className="product-image">
                    <img
                      onClick={() => history.push("/products/" + stockId)}
                      src={image}
                      alt="shoesimage"
                    />
                  </td>
                  <td className="product-name">
                    <div
                      onClick={() => history.push("/products/" + stockId)}
                      className="name"
                    >
                      {name}
                    </div>
                    <div className="size">Size: {sizeName}</div>
                  </td>
                  <td className="product-price">{vietNamCurrency(price)}</td>
                  <td className="product-qty">{quantity}</td>
                  <td className="product-subtotal">
                    {vietNamCurrency(price * quantity)}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
        <div>
          <div className="total">
            <table className="total-table">
              <tbody>
                <tr>
                  <td className="align-right">
                    <strong>Tổng thành tiền</strong>
                  </td>
                  <td className="align-right">
                    <strong>
                      {vietNamCurrency(
                        cartItems.reduce(
                          (total, item) => total + item.price * item.quantity,
                          0
                        )
                      )}
                    </strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>{" "}
      </div>
    </div>
  );
}

export default OrderDetail;
