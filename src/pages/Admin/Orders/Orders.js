import React, { useEffect, useState, useRef, Component } from "react";
import ABreadcrumb from "Components/Admin/Breadcrumb/Breadcrumb";
import { Link } from "react-router-dom";
import "./Orders.scss";
import { useDispatch } from "react-redux";
import { getOrderAction } from "state/actions/index";
import APagination from "Components/Admin/Pagination/Pagination";
import { NoDataComponent } from "utils/utils";
import { formatDateTime, formatDate } from "utils/helper";
import history from "state/history";
import qs from "query-string";
import { useReactToPrint } from "react-to-print";

const WAITING = 1;
const CANCEL = 3;

function AOrders({ location: { search } }) {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const mapResponseToData = (res) =>
    res.map((r) => ({
      id: r.Id,
      address: r.DeliverAddress,
      createDate: r.OrderDate,
      confirmDate: r.ConfirmDate,
      cancelDate: r.CancelDate,
      deliveryDate: r.DeliveryDate,
      beginDelivery: r.BeginDelivery,
      receiverName: r.RecipientName,
      phone: r.RecipientPhoneNumber,
      status: r.Status,
      total: r.Total,
      customerId: r.CustomerId,
      customerName: r.Customer.Name,
      items: r.OrderItems.map((i) => ({
        id: i.ShoesId,
        name: i.ShoesName,
        img: i.ImagePath,
        price: i.PricePerUnit,
        amount: i.Amount,
      })),
      note: r.Note,
    }));

  const fillQuery = (page, pageSize) => {
    const pageQuery = page > 1 ? page : null;
    const pageSizeQuery = pageSize > 10 ? pageSize : null;
    return qs.stringify(
      { page: pageQuery, "page-size": pageSizeQuery },
      { skipNull: true }
    );
  };

  const fetchOrder = (page, pageSize) => {
    const query = fillQuery(page, pageSize);

    history.push(`?${query}`);
    dispatch(getOrderAction({ page, pageSize })).then(({ response, total }) => {
      const newData = mapResponseToData(response);

      setData(newData);
      setTotal(total);
    });
  };

  useEffect(() => {
    let { page, "page-size": pageSize, ...filter } = qs.parse(search);

    page = page || 1;
    pageSize = pageSize || 10;

    fetchOrder(page, pageSize);
  }, []);

  const handlePageChange = (page) => {
    const query = fillQuery(page, pageSize);
    history.push(`?${query}`);

    setPage(page);
    fetchOrder(page, pageSize);
  };

  const handlePerPageChange = (event) => {
    const pageSize = event.target.value;

    const query = fillQuery(page, pageSize);
    history.push(`?${query}`);

    setPageSize(pageSize);
    setPage(1);
    fetchOrder(1, pageSize);
  };

  return (
    <div>
      <ABreadcrumb title="Tất cả sản phẩm" list={BREADCRUMB} />
      <div className="row mt-5">
        <div className="col-md-12">
          {data.map((prop, index) => (
            <Order key={index} {...prop} />
          ))}
          {!data.length && <NoDataComponent title="đơn hàng" />}
          <APagination
            page={page}
            handlePageChange={(page) => handlePageChange(page)}
            totalRows={total}
            perPage={pageSize}
            pageSizes={[10, 15, 20, 25]}
            handlePerPageChange={handlePerPageChange}
          />
        </div>
      </div>
    </div>
  );
}

export default AOrders;

const BREADCRUMB = [{ link: "/admin/orders", name: "Danh sách đơn hàng" }];

const Order = ({
  id,
  status,
  address,
  createDate,
  confirmDate,
  cancelDate,
  deliveryDate,
  beginDelivery,
  receiverName,
  phone,
  total,
  customerId,
  customerName,
  items,
  note,
}) => {
  const componentRef = useRef();

  const formatStatus = (stt) =>
    stt === 1 ? "Chờ xác nhận" : stt === 2 ? "Đã xác nhận" : "Đã huỷ";

  const formatDelivery = () =>
    deliveryDate
      ? "Đã giao"
      : beginDelivery
      ? "Đang giao hàng"
      : "Chưa giao hàng";

  const delivery = deliveryDate
    ? "delivered"
    : beginDelivery
    ? "delivering"
    : "not-yet";

  const onInput = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  useEffect(() => {
    const tx = document.getElementById("order--note");
    tx.setAttribute(
      "style",
      "height:" + tx.scrollHeight + "px;overflow:hidden;"
    );
    tx.addEventListener("input", onInput, false);
  });

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Danh sách đơn hàng",
  });

  const props = {
    createDate,
    total,
    items,
    id,
    customerName,
    receiverName,
    phone,
    address,
  };

  return (
    <div
      className="card mb-5 orders--wrapper"
      style={{ paddingLeft: "30px", paddingRight: "30px" }}
    >
      <div className="row order--head pt-4">
        <div className="col-12 col-lg-9">
          <div className="order--status">
            <div className="order--status--item pb-4">
              <div className="order--status--item--top">Mã</div>
              <div className="order--status--item--bottom">
                <div className="table-break-word">
                  <Link
                    to={`/admin/orders/${id}`}
                    className={`${status === CANCEL ? "isCancel" : ""}`}
                  >
                    <strong>{`#${id}`}</strong>
                  </Link>
                </div>
              </div>
            </div>
            <div className="order--status--item pb-4">
              <div className="order--status--item--top">Ngày đặt hàng</div>
              <div className="order--status--item--bottom">
                <div
                  className={`table-break-word ${
                    status === CANCEL ? "isCancel" : ""
                  }`}
                >
                  <span>{formatDateTime(new Date(createDate))}</span>
                </div>
              </div>
            </div>
            <div className="order--status--item pb-4">
              <div className="order--status--item--top">Tình trạng</div>
              <div className="order--status--item--bottom">
                <div className="table-break-word">
                  <div className="status--component">
                    <span
                      className={`circle--status mr-2 circle--status--${status}`}
                    ></span>
                    <span className={`badges--status--${status}`}>
                      {formatStatus(status)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {status < CANCEL && (
              <div className="order--status--item pb-4">
                <div className="order--status--item--top">Giao hàng</div>
                <div className="order--status--item--bottom">
                  <div className="table-break-word">
                    <div className="status--component">
                      <span
                        className={`circle--status mr-2 circle--status--${delivery}`}
                      ></span>
                      <span className={`badges--status--${delivery}`}>
                        {formatDelivery()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="col-12 col-lg-3 text-right">
          <Link to={`/admin/orders/${id}`}>
            <span>Xem chi tiết</span>
            <span className="fas fa-arrow-right ml-2"></span>
          </Link>
        </div>
      </div>
      <div className="row order--body">
        <div className="col-lg-5 col-12 pb-4">
          <div className="order--product pr-4">
            {items.map((item, index) => (
              <Product key={index} {...item} />
            ))}
            <div className="py-3 px-0 text-right">
              <strong>{`Tổng: ${total} ₫`}</strong>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-7 col-12 pb-4">
          <div className="row order--info">
            <div className="col-12">
              <div className="row">
                <div className="col-auto">
                  <div style={{ marginBottom: "1rem" }}>
                    <strong>Thông tin giao hàng</strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 pb-3">
              <span style={{ fontSize: "14px", color: "grey" }}>
                Khách hàng:{" "}
              </span>
              <Link to={`/admin/customer/${customerId}`} target="_blank">
                <strong>{customerName}</strong>
              </Link>
            </div>
            <div className="col-12">
              <span style={{ fontSize: "14px", color: "grey" }}>
                Người nhận:{" "}
              </span>
              <strong>{receiverName}</strong>
            </div>
            <div className="col-12">
              <span style={{ fontSize: "14px", color: "grey" }}>SĐT: </span>
              <strong>{phone}</strong>
            </div>
            <div className="col-12">
              <span style={{ fontSize: "14px", color: "grey" }}>Địa chỉ: </span>
              <span className="table-break-word" style={{ display: "inline" }}>
                {address}
              </span>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-5 col-12 pb-4">
          <div className="row">
            <div className="col-12">
              <label>Ghi chú</label>
              <textarea
                defaultValue={note}
                id="order--note"
                className="order--note"
                rows={3}
                placeholder="Ghi chú đơn hàng"
              ></textarea>
            </div>
            <div className="col-12 text-right py-2">
              <button className="btn btn-clean px-0">
                <i className="far fa-save mr-2" />
                <span>Lưu ghi chú</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row order--footer">
        <div className="col-12">
          <div className="border-top mb-4"></div>
          <button className="btn btn-clean mb-4" onClick={handlePrint}>
            <i className="icon-printer mr-3" />
            In đơn hàng
          </button>
          {status < CANCEL && (
            <button className="btn btn-clean mb-4">
              <i className="icon-close mr-3" />
              Huỷ đơn hàng
            </button>
          )}
          <div className="float-right text-right">
            {status < CANCEL ? (
              <>
                {status === WAITING && (
                  <button className="btn btn-default mb-4 ml-3">
                    Xác nhận đơn hàng
                  </button>
                )}
                <button className="btn btn-default mb-4 ml-3">
                  <i className="flaticon-delivery-truck mr-2" />
                  Bắt đầu giao hàng
                </button>{" "}
              </>
            ) : (
              <>
                <div className="status--component d-inline-block">
                  <span
                    className={`circle--status mr-2 circle--status--${status}`}
                  ></span>
                  <span className={`badges--status--${status}`}>
                    Đơn hàng đã bị huỷ
                  </span>
                </div>
                <span className="d-inline-block ml-3">
                  <svg
                    className="svg-next-icon mr-2 svg-next-icon-size-14"
                    width="14"
                    height="14"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      version="1.1"
                    >
                      <path d="M12.512,6.968 L12.512,12.224 L17,14.888 L16.256,16.16 L11,12.968 L11,6.968 L12.512,6.968 Z M11.984,20 C13.4240072,20 14.7679938,19.6320037 16.016,18.896 C17.2320061,18.1919965 18.1919965,17.2320061 18.896,16.016 C19.6320037,14.7679938 20,13.4240072 20,11.984 C20,10.5439928 19.6320037,9.20000624 18.896,7.952 C18.1919965,6.73599392 17.2320061,5.77600352 16.016,5.072 C14.7679938,4.33599632 13.4240072,3.968 11.984,3.968 C10.5439928,3.968 9.20000624,4.33599632 7.952,5.072 C6.73599392,5.77600352 5.77600352,6.73599392 5.072,7.952 C4.33599632,9.20000624 3.968,10.5439928 3.968,11.984 C3.968,13.4240072 4.33599632,14.7679938 5.072,16.016 C5.77600352,17.2320061 6.73599392,18.1919965 7.952,18.896 C9.20000624,19.6320037 10.5439928,20 11.984,20 Z M11.984,2 C13.8080091,2 15.4959922,2.45599544 17.048,3.368 C18.5520075,4.23200432 19.7359957,5.41599248 20.6,6.92 C21.5120046,8.47200776 21.968,10.1599909 21.968,11.984 C21.968,13.8080091 21.5120046,15.4959922 20.6,17.048 C19.7359957,18.5520075 18.5520075,19.7359957 17.048,20.6 C15.4959922,21.5120046 13.8080091,21.968 11.984,21.968 C10.1599909,21.968 8.47200776,21.5120046 6.92,20.6 C5.41599248,19.7199956 4.23200432,18.5280075 3.368,17.024 C2.45599544,15.4719922 2,13.792009 2,11.984 C2,10.175991 2.45599544,8.49600776 3.368,6.944 C4.2480044,5.43999248 5.43999248,4.2480044 6.944,3.368 C8.49600776,2.45599544 10.175991,2 11.984,2 Z"></path>
                    </svg>
                  </svg>
                  <span>{formatDateTime(new Date(cancelDate))}</span>
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="d-none">
        <ProductToPrint ref={componentRef} {...props} />
      </div>
    </div>
  );
};

const Product = ({ id, name, img, price, amount }) => (
  <div className="order--product--item py-3 px-0">
    <div className="product--image">
      <div className="table-cell--image mr-2">
        <img className="box--image" src={img} alt="product avatar" />
      </div>
      <div className="table-cell--info">
        <Link to={`/admin/shoes/${id}`} target="_blank">
          <strong className="text-primary mb-2 d-inline-block">{name}</strong>
        </Link>
      </div>
    </div>
    <div className="border--0 text-right">
      <div>{`x ${amount}`}</div>
      <span>{`${price} ₫`}</span>
    </div>
  </div>
);

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