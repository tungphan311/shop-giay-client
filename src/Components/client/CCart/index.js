import React, { useEffect, useState } from "react";
import "./Cart.scss";
import { vietNamCurrency } from "utils";
import CButton from "Components/client/CButton";
import history from "state/history";
import { useDispatch, useSelector } from "react-redux";
import {
  ACTION_GET_CART_ITEMS,
  ACTION_UPDATE_CART,
  ACTION_REMOVE_CART,
} from "state/reducers/cCartReducer";

const CCart = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: ACTION_GET_CART_ITEMS });
  }, []);

  const cartItems = useSelector((state) => state.ccart.cartItems);
  const [quantityList, setQuantityList] = useState({});

  return (
    <div className="cart-wrapper">
      <div className="cart-container">
        <div className="cart-header">Giỏ hàng</div>
        <div className="cart-product-header">Giày trong giỏ</div>
        <table className="cart-table">
          <thead>
            <tr>
              <td colSpan="2" className="product-name">
                Giày
              </td>
              <td className="product-remove"></td>
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
                  className={`cart-table-row-${
                    index % 2 === 1 ? "even" : "odd"
                  }`}
                >
                  <td className="product-image">
                    <img
                      onClick={() => history.push("/products/" + stockId)}
                      src={image}
                      alt="WTF"
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
                  <td className="product-remove">
                    <div
                      onClick={() =>
                        dispatch({
                          type: ACTION_REMOVE_CART,
                          payload: { stockId },
                        })
                      }
                      className="remove"
                    ></div>
                    <div
                      onClick={() =>
                        dispatch({
                          type: ACTION_REMOVE_CART,
                          payload: { stockId },
                        })
                      }
                      className="remove-text"
                    >
                      Xóa
                    </div>
                  </td>
                  <td className="product-price">{vietNamCurrency(price)}</td>
                  <td className="product-qty">
                    <input
                      style={{ appearance: "none" }}
                      type="number"
                      value={
                        quantityList[stockId] ? quantityList[stockId] : quantity
                      }
                      onChange={({ target: { value } }) => {
                        setQuantityList((state) => ({
                          ...state,
                          [stockId]: value > 99 ? 99 : value,
                        }));
                      }}
                    />
                  </td>
                  <td className="product-subtotal">
                    {vietNamCurrency(
                      (quantityList[stockId]
                        ? quantityList[stockId]
                        : quantity) * price
                    )}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
        <div>
          <div className="update-buttons">
            <CButton className="continue-shopping" label="Tiếp tục mua sắm" />
            <CButton
              onClick={() =>
                dispatch({
                  type: ACTION_UPDATE_CART,
                  payload: { data: quantityList },
                })
              }
              label="Cập nhật giỏ hàng"
            />
          </div>
        </div>
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
                          (total, item) =>
                            total +
                            item.price *
                              (quantityList[item.stockId]
                                ? quantityList[item.stockId]
                                : item.quantity),
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
        <div>
          <div className="checkout">
            <CButton label="Tiến hành đặt hàng" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CCart;
