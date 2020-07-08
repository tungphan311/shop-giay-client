import React, { useEffect, useState, useRef } from "react";
import ABreadcrumb from "Components/Admin/Breadcrumb/Breadcrumb";
import { Link } from "react-router-dom";
import "./Orders.scss";
import { useDispatch } from "react-redux";
import { getOrderAction, updateOrderAction } from "state/actions/index";
import APagination from "Components/Admin/Pagination/Pagination";
import { NoDataComponent } from "utils/utils";
import { formatDateTime } from "utils/helper";
import history from "state/history";
import qs from "query-string";
import { useReactToPrint } from "react-to-print";
import swal from "sweetalert";
import ProductToPrint from "pages/Admin/Orders/ProductToPrint";

const WAITING = 1;
const CONFIRM = 2;
const CANCEL = 3;

function AOrders({ location: { search } }) {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const mapFunction = (r) => ({
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
  });

  const mapResponseToData = (res) => res.map((r) => mapFunction(r));

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
    let { page, "page-size": pageSize } = qs.parse(search);

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

  const updateOrder = (order, res) => ({
    ...order,
    status: res.Status,
    deliveryDate: res.DeliveryDate,
    beginDelivery: res.BeginDelivery,
    cancelDate: res.CancelDate,
    confirmDate: res.ConfirmDate,
    note: res.Note,
  });

  const handleUpdateOrder = (
    id,
    status,
    deliveryDate,
    beginDelivery,
    cancelDate,
    confirmDate,
    note,
    confirm,
    msg,
    icon
  ) => {
    if (confirm) {
      swal(msg, {
        buttons: ["Trở lại", "Tiếp tục"],
        icon,
      }).then((cancel) => {
        if (cancel) {
          dispatch(
            updateOrderAction({
              id,
              status,
              deliveryDate,
              beginDelivery,
              cancelDate,
              confirmDate,
              note,
            })
          ).then((res) => {
            let newData = [...data];
            const index = newData.findIndex((x) => x.id === res.Id);

            newData[index] = updateOrder(newData[index], res);

            setData(newData);
          });
        }
      });
    } else {
      dispatch(
        updateOrderAction({
          id,
          status,
          deliveryDate,
          beginDelivery,
          cancelDate,
          confirmDate,
          note,
        })
      ).then((res) => {
        let newData = [...data];
        const index = newData.findIndex((x) => x.id === res.Id);

        newData[index] = updateOrder(newData[index], res);

        setData(newData);
      });
    }
  };

  const handleConfirmOrder = (
    id,
    status,
    deliveryDate,
    beginDelivery,
    cancelDate,
    confirmDate,
    note
  ) => {
    swal(`Xác nhận đơn hàng #${id}`, {
      buttons: ["Trở lại", "Chắc chắn"],
      icon: "info",
    }).then((cancel) => {
      if (cancel) {
        dispatch(
          updateOrderAction({
            id,
            status,
            deliveryDate,
            beginDelivery,
            cancelDate,
            confirmDate,
            note,
          })
        ).then((res) => {
          let newData = [...data];
          const index = newData.findIndex((x) => x.id === res.Id);

          newData[index] = updateOrder(newData[index], res);

          setData(newData);
        });
      }
    });
  };

  return (
    <div>
      <ABreadcrumb title="Tất cả sản phẩm" list={BREADCRUMB} />
      <div className="row mt-5">
        <div className="col-md-12">
          {data.map((prop, index) => (
            <Order
              key={index}
              handleUpdateOrder={handleUpdateOrder}
              handleConfirmOrder={handleConfirmOrder}
              {...prop}
            />
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
  handleUpdateOrder,
}) => {
  const [txtNote, setNote] = useState(note);
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

  const handleCancel = () => {
    const now = new Date().toISOString();
    handleUpdateOrder(
      id,
      3,
      deliveryDate,
      beginDelivery,
      now,
      confirmDate,
      note,
      true,
      "Trong trường hợp đơn hàng giả mạo, khách hàng thay đổi nhu cầu hoặc sản phẩm đã hết hàng, bạn nên huỷ đơn hàng. Huỷ bỏ đơn hàng là thao tác không thể phục hồi lại",
      "warning"
    );
  };

  const handleConfirm = () => {
    const now = new Date().toISOString();

    handleUpdateOrder(
      id,
      2,
      deliveryDate,
      beginDelivery,
      cancelDate,
      now,
      note,
      true,
      `Xác nhận đơn hàng #${id}`,
      "info"
    );
  };

  const handleDelivery = () => {
    const now = new Date().toISOString();

    handleUpdateOrder(
      id,
      status,
      deliveryDate,
      now,
      cancelDate,
      confirmDate,
      note,
      true,
      `Xác nhận giao đơn hàng #${id}`,
      "info"
    );
  };

  const handleDelivered = () => {
    const now = new Date().toISOString();

    handleUpdateOrder(
      id,
      status,
      now,
      beginDelivery,
      cancelDate,
      confirmDate,
      note,
      true,
      `Xác nhận giao thành công đơn hàng #${id}`,
      "info"
    );
  };

  const handleSaveNote = () => {
    handleUpdateOrder(
      id,
      status,
      deliveryDate,
      beginDelivery,
      cancelDate,
      confirmDate,
      txtNote,
      false
    );
  };

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
                  <div className="table-break-word d-inline-block">
                    <div className="status--component">
                      <span
                        className={`circle--status mr-2 circle--status--${delivery}`}
                      ></span>
                      <span className={`badges--status--${delivery}`}>
                        {formatDelivery()}
                      </span>
                    </div>
                  </div>
                  {deliveryDate && (
                    <span className="d-inline-block ml-3">
                      <Timer />
                      <span>{formatDateTime(new Date(deliveryDate))}</span>
                    </span>
                  )}
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
                value={txtNote}
                onChange={(e) => setNote(e.target.value)}
                id="order--note"
                className="order--note"
                rows={3}
                placeholder="Ghi chú đơn hàng"
              ></textarea>
            </div>
            <div className="col-12 text-right py-2">
              <button className="btn btn-clean px-0" onClick={handleSaveNote}>
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
            <button className="btn btn-clean mb-4" onClick={handleCancel}>
              <i className="icon-close mr-3" />
              Huỷ đơn hàng
            </button>
          )}
          <div className="float-right text-right">
            {status < CANCEL ? (
              <>
                {status === WAITING && (
                  <button
                    className="btn btn-default mb-4 ml-3"
                    onClick={handleConfirm}
                  >
                    Xác nhận đơn hàng
                  </button>
                )}
                {!deliveryDate &&
                  (!beginDelivery ? (
                    <button
                      className="btn btn-default mb-4 ml-3"
                      disabled={status !== CONFIRM}
                      onClick={handleDelivery}
                    >
                      <i className="flaticon-delivery-truck mr-2" />
                      Bắt đầu giao hàng
                    </button>
                  ) : (
                    <button
                      className="btn btn-default mb-4 ml-3"
                      disabled={status !== CONFIRM}
                      onClick={handleDelivered}
                    >
                      <i className="flaticon-delivery-truck mr-2" />
                      Đã giao hàng
                    </button>
                  ))}
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
                  <Timer />
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

export const Timer = () => (
  <svg
    className="svg-next-icon mr-2 svg-next-icon-size-14"
    width="14"
    height="14"
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" version="1.1">
      <path d="M12.512,6.968 L12.512,12.224 L17,14.888 L16.256,16.16 L11,12.968 L11,6.968 L12.512,6.968 Z M11.984,20 C13.4240072,20 14.7679938,19.6320037 16.016,18.896 C17.2320061,18.1919965 18.1919965,17.2320061 18.896,16.016 C19.6320037,14.7679938 20,13.4240072 20,11.984 C20,10.5439928 19.6320037,9.20000624 18.896,7.952 C18.1919965,6.73599392 17.2320061,5.77600352 16.016,5.072 C14.7679938,4.33599632 13.4240072,3.968 11.984,3.968 C10.5439928,3.968 9.20000624,4.33599632 7.952,5.072 C6.73599392,5.77600352 5.77600352,6.73599392 5.072,7.952 C4.33599632,9.20000624 3.968,10.5439928 3.968,11.984 C3.968,13.4240072 4.33599632,14.7679938 5.072,16.016 C5.77600352,17.2320061 6.73599392,18.1919965 7.952,18.896 C9.20000624,19.6320037 10.5439928,20 11.984,20 Z M11.984,2 C13.8080091,2 15.4959922,2.45599544 17.048,3.368 C18.5520075,4.23200432 19.7359957,5.41599248 20.6,6.92 C21.5120046,8.47200776 21.968,10.1599909 21.968,11.984 C21.968,13.8080091 21.5120046,15.4959922 20.6,17.048 C19.7359957,18.5520075 18.5520075,19.7359957 17.048,20.6 C15.4959922,21.5120046 13.8080091,21.968 11.984,21.968 C10.1599909,21.968 8.47200776,21.5120046 6.92,20.6 C5.41599248,19.7199956 4.23200432,18.5280075 3.368,17.024 C2.45599544,15.4719922 2,13.792009 2,11.984 C2,10.175991 2.45599544,8.49600776 3.368,6.944 C4.2480044,5.43999248 5.43999248,4.2480044 6.944,3.368 C8.49600776,2.45599544 10.175991,2 11.984,2 Z"></path>
    </svg>
  </svg>
);

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
