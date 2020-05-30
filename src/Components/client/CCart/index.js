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
import { toastErr } from "utils/index";

const CCart = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: ACTION_GET_CART_ITEMS });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cartItems = useSelector((state) => state.ccart.cartItems);
  const [quantityList, setQuantityList] = useState({});
  const isLoggedIn = useSelector((state) => state.cauth.username);

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
            {cartItems && cartItems.length !== 0 ? (
              cartItems.map(
                (
                  { stockId, image, name, sizeName, price, quantity, shoesId },
                  index
                ) => (
                  <tr
                    key={index}
                    className={`cart-table-row-${
                      index % 2 === 1 ? "even" : "odd"
                    }`}
                  >
                    <td className="product-image">
                      <img
                        onClick={() => history.push("/products/" + shoesId)}
                        src={image}
                        alt="shoesimage"
                      />
                    </td>
                    <td className="product-name">
                      <div
                        onClick={() => history.push("/products/" + shoesId)}
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
                          quantityList[stockId] || quantityList[stockId] === 0
                            ? quantityList[stockId]
                            : quantity
                        }
                        onChange={({ target: { value } }) => {
                          setQuantityList((state) => ({
                            ...state,
                            [stockId]: !value ? 0 : value > 999 ? 999 : value,
                          }));
                        }}
                      />
                    </td>
                    <td className="product-subtotal">
                      {vietNamCurrency(
                        (quantityList[stockId] || quantityList[stockId] === 0
                          ? quantityList[stockId]
                          : quantity) * price
                      )}
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr className="cart-table-row-even">
                <td className="no-product" colSpan="6">
                  Giỏ hàng rỗng
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <div>
          <div className="update-buttons">
            <CButton
              href="/products"
              className="continue-shopping"
              label="Tiếp tục mua sắm"
            />
            <CButton
              onClick={() => {
                if (Object.keys(quantityList).length !== 0) {
                  dispatch({
                    type: ACTION_UPDATE_CART,
                    payload: { data: quantityList },
                  });
                  setQuantityList({});
                } else toastErr("Không có gì để cập nhật");
              }}
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
            <CButton
              onClick={() =>
                cartItems && cartItems.length !== 0
                  ? isLoggedIn
                    ? history.push("/checkout/shipping")
                    : history.push("/login?r=/checkout/shipping")
                  : toastErr("Giỏ hàng rỗng")
              }
              label="Tiến hành đặt hàng"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CCart;
