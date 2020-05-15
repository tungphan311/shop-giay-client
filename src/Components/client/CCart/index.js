import React from "react";
import "./Cart.scss";
import { vietNamCurrency } from "utils";
import CButton from "Components/client/CButton";
import history from "state/history";
const EXAMPLE_CART_PRODUCT = [
  {
    id: 1,
    image:
      "https://a248.e.akamai.net/f/248/9086/10h/origin-d5.scene7.com/is/image/sneakerhead/snusa-detail_20?$sn20-650$&$img=sneakerhead/adidas-yeezy-boost-350-v2-fx9033-1",
    productName: "NIKE AIR FORCE 1 REACT",
    size: "M",
    price: 100000,
    qty: 12,
    subtotal: 100000,
  },
  {
    id: 1,
    image:
      "https://a248.e.akamai.net/f/248/9086/10h/origin-d5.scene7.com/is/image/sneakerhead/snusa-detail_20?$sn20-650$&$img=sneakerhead/adidas-yeezy-boost-350-v2-fx9033-1",
    productName: "NIKE AIR FORCE 1 REACT",
    size: "M",
    price: 100000,
    qty: 1223,
  },
  {
    id: 1,
    image:
      "https://a248.e.akamai.net/f/248/9086/10h/origin-d5.scene7.com/is/image/sneakerhead/snusa-detail_20?$sn20-650$&$img=sneakerhead/adidas-yeezy-boost-350-v2-fx9033-1",
    productName: "NIKE AIR FORCE 1 REACT",
    size: "M",
    price: 100000,
    qty: 1,
  },
];
const CCart = () => {
  return (
    <div className="cart-wrapper">
      <div className="cart-container">
        <div className="cart-header">Giỏ hàng</div>
        <div className="cart-product-header">Giày trong giỏ</div>
        <table className="cart-table">
          <thead>
            <tr>
              <td colspan="2" className="product-name">
                Giày
              </td>
              <td className="product-remove"></td>
              <td className="product-price">Giá</td>
              <td className="product-qty">Số lượng</td>
              <td className="product-subtotal">Thành tiền</td>
            </tr>
          </thead>
          <tbody>
            {EXAMPLE_CART_PRODUCT.map(
              ({ id, image, productName, size, price, qty }, index) => (
                <tr
                  className={`cart-table-row-${
                    index % 2 === 1 ? "even" : "odd"
                  }`}
                >
                  <td className="product-image">
                    <img
                      onClick={() => history.push("/products/" + id)}
                      src={image}
                      alt="WTF"
                    />
                  </td>
                  <td className="product-name">
                    <div
                      onClick={() => history.push("/products/" + id)}
                      className="name"
                    >
                      {productName}
                    </div>
                    <div className="size">Size: {size}</div>
                  </td>
                  <td className="product-remove">
                    <div className="remove"></div>
                    <div className="remove-text">Xóa</div>
                  </td>
                  <td className="product-price">{vietNamCurrency(price)}</td>
                  <td className="product-qty">
                    <input value={qty} />
                  </td>
                  <td className="product-subtotal">
                    {vietNamCurrency(qty * price)}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
        <div>
          <div className="update-buttons">
            <CButton className="continue-shopping" label="Tiếp tục mua sắm" />
            <CButton label="Cập nhật giỏ hàng" />
          </div>
        </div>
        <div>
          <div className="total">
            <table className="total-table">
              <tbody>
                <tr>
                  <td class="align-right">
                    <strong>Tổng thành tiền</strong>
                  </td>
                  <td class="align-right">
                    <strong>
                      {vietNamCurrency(
                        EXAMPLE_CART_PRODUCT.reduce(
                          (total, item) => total + item.price * item.qty,
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
