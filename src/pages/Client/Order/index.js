import React, { useState, useEffect } from "react";
import "./Order.scss";
import { vietNamCurrency, stringTruncate } from "utils/index";
import Pagination from "react-js-pagination";
import CLoadingIndicator from "Components/client/CLoadingIndicator/index";
import history from "state/history";
import { cGetOrder } from "services/cOrderService";

const DEFAULT_PAGESIZE = 10;

const getProductString = (
  products,
  length = 100,
  ending = "...",
  between = ", "
) => {
  return (
    products &&
    products.reduce((result, current, index, array) => {
      if (length <= 0) return result;
      if (current.length < length) {
        length = length - current.length;
        return result + (index === 0 ? "" : between) + current;
      } else {
        if (length > current.length / 2) {
          length = length - current.length;
          return (
            result +
            (index === 0 ? "" : between) +
            stringTruncate(current, length + current.length, ending) +
            ` và ${array.length - index - 1} sản phẩm khác`
          );
        } else {
          length = 0;
          return result + ` và ${array.length - index} sản phẩm khác`;
        }
      }
    }, "")
  );
};

const Order = () => {
  const [page, setPage] = useState(1);
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  useEffect(() => {
    setLoading(true);

    cGetOrder(page, DEFAULT_PAGESIZE).then((res) => {
      const {
        data: { code, data, totalRecords },
      } = res;

      if (code === "OK") {
        const parsed = JSON.parse(data);
        setTotalRecords(totalRecords);
        setOrderList(parsed);
        setLoading(false);
      } else {
        history.push("/login");
      }
    });
    // setTimeout(() => {
    //   setOrderList([...getOrders(page)]);
    //   setLoading(false);
    // }, 1000);
  }, [page]);

  return (
    <div className="order-wrapper">
      <div className="order-container">
        <div className="order-header">Đơn hàng của tôi</div>
        <table className="order-table">
          {loading && (
            <div className="loader-wrapper">
              <CLoadingIndicator />
            </div>
          )}
          <thead>
            <tr>
              <td className="order-code">Mã đơn hàng</td>
              <td className="order-date">Ngày mua</td>
              <td className="order-products">Sản phẩm</td>
              <td className="order-total">Tổng tiền</td>
              <td className="order-status">Trạng thái đơn hàng</td>
            </tr>
          </thead>
          <tbody>
            {orderList.map(
              ({ id, orderDate, cartItemDTOList, total, status }, index) => (
                <tr
                  key={id}
                  className={`order-table-row-${index % 2 ? "odd" : "even"}`}
                >
                  <td className="order-code">
                    <div onClick={() => history.push("/order/" + id)}>{id}</div>
                  </td>
                  <td className="order-date">{orderDate}</td>
                  <td className="order-products">
                    {getProductString(
                      cartItemDTOList.map((x) => x.name + ` size ${x.sizeName}`)
                    )}
                  </td>
                  <td className="order-total">{vietNamCurrency(total)}</td>
                  <td className="order-status">{status}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
        <div className="pagination-container">
          {" "}
          <Pagination
            pageRangeDisplayed={5}
            activePage={page}
            itemsCountPerPage={DEFAULT_PAGESIZE}
            totalItemsCount={totalRecords}
            onChange={(pageNumber) => setPage(pageNumber)}
            innerClass="pagination-bar"
            itemClass="itemClass"
            itemClassFirst="itemClass"
          />
        </div>
      </div>
    </div>
  );
};

export default Order;
