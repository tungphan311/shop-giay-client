import React, { Component } from "react";
import { formatDate, formatDateTime } from "utils/helper";

class ProductToPrint extends Component {
  state = {
    details: [
      { label: "Mã sản phẩm", width: 20 },
      { label: "Sản phẩm", width: 40 },
      { label: "Số lượng", width: 15 },
      { label: "Giá", width: 25 },
    ],
  };

  render() {
    const {
      createDate,
      items,
      total,
      id,
      customerName,
      receiverName,
      phone,
      address,
    } = this.props;

    const TableHead = ({ label, width }) => (
      <th style={{ width: `${width}%`, textAlign: "left", padding: "5px 0" }}>
        {label}
      </th>
    );

    const Row = ({ id, name, amount, price }) => (
      <tr style={{ borderTop: "1px solid #d9d9d9" }}>
        <td align="left" style={{ padding: "5px 0" }}>
          {`#${id}`}
        </td>
        <td
          align="left"
          style={{ padding: "5px 5px 5px 0", whiteSpace: "normal" }}
        >
          <p style={{ marginBottom: "5px" }}>{name}</p>
        </td>
        <td align="center" style={{ padding: "5px 0" }}>
          {amount}
        </td>
        <td align="left" style={{ padding: "5px 0" }}>{`${price}₫`}</td>
      </tr>
    );

    const { details } = this.state;

    return (
      <div id="printContainer">
        <meta charSet="utf-8" />
        <div
          style={{ padding: "0 0 0 20mm", margin: 0, pageBreakAfter: "always" }}
        >
          <div>
            <div
              style={{
                float: "right",
                textAlign: "right",
                paddingRight: "20mm",
              }}
            >
              <p>{`Ngày đặt hàng: ${formatDateTime(new Date(createDate))}`}</p>
            </div>
            <div style={{ margin: "20mm 0 1.5em 0" }}>
              <p>
                <strong style={{ fontSize: "18px" }}>SNEAKER HEAD</strong>
              </p>
              <p>
                <strong>Địa chỉ:</strong> KP6, P.Linh Trung, Q.Thủ Đức, Hồ Chí
                Minh
              </p>
              <p>
                <strong>Website:</strong> https://shoess.azurewebsites.net
              </p>
              <p>
                <strong>Email:</strong> thanhtunga1lqd@gmail.com
              </p>
            </div>
            <div style={{ clear: "both" }}></div>
          </div>
          <div>
            <div style={{ width: "60%", float: "left" }}>
              <h3 style={{ fontSize: "14px", lineHeight: 0 }}>
                Chi tiết đơn hàng
              </h3>
              <hr style={{ border: "none", borderTop: "2px solid #0975BD" }} />
              <table
                style={{
                  margin: "0 0 1.5em 0",
                  fontSize: "12px",
                  width: "100%",
                }}
              >
                <thead>
                  <tr>
                    {details.map((d, index) => (
                      <TableHead key={index} {...d} />
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, index) => (
                    <Row key={index} {...item} />
                  ))}
                </tbody>
              </table>
              <h3 style={{ fontSize: "14px", margin: "0 0 1em 0" }}>
                Thông tin thanh toán
              </h3>
              <table
                style={{
                  fontSize: "12px",
                  width: "100%",
                  margin: "0 0 1.5em 0",
                }}
              >
                <tbody>
                  <tr>
                    <td style={{ padding: "5px 0" }}>Tổng giá trị sản phẩm:</td>
                    <td style={{ textAlign: "right" }}></td>
                  </tr>
                  <tr>
                    <td style={{ padding: "5px 0", width: "50%" }}>
                      Phí vận chuyển:
                    </td>
                    <td
                      style={{ textAlign: "right", padding: "5px 0" }}
                    >{`0₫`}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "5px 0" }}>
                      <strong>Tổng tiền:</strong>
                    </td>
                    <td style={{ textAlign: "right", padding: "5px 0" }}>
                      <strong>{`${total}₫`}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              style={{ width: "40%", float: "left", padding: "0 20mm 0 40px" }}
            >
              <h3 style={{ fontSize: "14px", lineHeight: 0 }}>
                Thông tin đơn hàng
              </h3>
              <hr style={{ border: "none", borderTop: "2px solid #0975BD" }} />
              <div
                style={{
                  margin: "0 0 1em 0",
                  padding: "1em",
                  border: "1px solid #d9d9d9",
                }}
              >
                <p>
                  <strong>Mã đơn hàng:</strong>
                </p>
                <p>{`#${id}`}</p>
                <p>
                  <strong>Ngày đặt hàng:</strong>
                </p>
                <p>{formatDate(new Date(createDate))}</p>
                <p>
                  <strong>Phương thức thanh toán:</strong>
                </p>
                <p>Thanh toán khi giao hàng (COD)</p>
              </div>
              <h3 style={{ fontSize: "14px", lineHeight: 0 }}>
                Thông tin mua hàng
              </h3>
              <hr style={{ border: "none", borderTop: "2px solid #0975BD" }} />
              <div
                style={{
                  margin: "0 0 1em 0",
                  padding: "1em",
                  border: "1px solid #d9d9d9",
                  whiteSpace: "normal",
                }}
              >
                <p>
                  <strong>Khác hàng:</strong>
                </p>
                <p>{customerName}</p>
                <p>
                  <strong>Người nhận:</strong>
                </p>
                <p>{receiverName}</p>
                <p>
                  <strong>Só điện thoại:</strong>
                </p>
                <p>{phone}</p>
                <p>
                  <strong>Địa chỉ giao hàng:</strong>
                </p>
                <p>{address}</p>
              </div>
            </div>
            <div style={{ clear: "both" }}></div>
          </div>
          <p>
            Nếu bạn có thắc mắc, vui lòng liên hệ chúng tôi qua email{" "}
            <u>thanhtunga1lqd@gmail.com </u>
          </p>
        </div>
      </div>
    );
  }
}

export default ProductToPrint;
