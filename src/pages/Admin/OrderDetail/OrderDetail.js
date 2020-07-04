import React, { useEffect, useState, useRef } from "react";
import ABreadcrumb from "Components/Admin/Breadcrumb/Breadcrumb";
import "./OrderDetail.scss";
import { useDispatch } from "react-redux";
import { getOrderByIdAction, updateOrderAction } from "state/actions/index";
import { formatDateTime } from "utils/helper";
import { Timer } from "pages/Admin/Orders/Orders";
import OutsideClickWrapper from "Components/Admin/OutsideClickWrapper/OutsideClickWrapper";
import { useReactToPrint } from "react-to-print";
import ProductToPrint from "pages/Admin/Orders/ProductToPrint";
import { Link } from "react-router-dom";
import { Verify, Warning } from "Components/Admin/Svg/index";
import swal from "sweetalert";

const WAITING = 1;
const CONFIRM = 2;
const CANCEL = 3;

function AOrderDetail({
  match: {
    params: { id },
  },
}) {
  const [order, setOrder] = useState({});
  const [dropdown, setDropdown] = useState(false);
  const [txtNote, setNote] = useState("");

  const dispatch = useDispatch();
  const componentRef = useRef();

  useEffect(() => {
    dispatch(getOrderByIdAction({ id })).then((r) => {
      const newOrder = {
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
        customerEmail: r.Customer.Email,
        items:
          r.OrderItems.map((i) => ({
            id: i.ShoesId,
            name: i.ShoesName,
            img: i.ImagePath,
            price: i.PricePerUnit,
            amount: i.Amount,
            total: i.Total,
          })) || [],
        note: r.Note,
        totalAmount: r.OrderItems.reduce(
          (accumulator, currentValue) => accumulator + currentValue.Amount,
          0
        ),
        totalPrice: r.OrderItems.reduce(
          (accumulator, currentValue) => accumulator + currentValue.Total,
          0
        ),
      };

      setNote(r.Note);
      setOrder(newOrder);
    });

    const tx = document.getElementById("order--note");
    tx.setAttribute(
      "style",
      "height:" + tx.scrollHeight + "px;overflow:hidden;"
    );
    tx.addEventListener("input", onInput, false);
  }, []);

  const {
    createDate,
    status,
    deliveryDate,
    beginDelivery,
    total,
    items,
    customerName,
    receiverName,
    phone,
    address,
    totalAmount,
    totalPrice,
    customerId,
    customerEmail,
    confirmDate,
    cancelDate,
    note,
  } = order;

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

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Danh sách đơn hàng",
  });

  const BREADCRUMB = [
    { link: "/admin/orders", name: "Danh sách đơn hàng" },
    { link: `/admin/orders/${id}`, name: `#${id}` },
  ];

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

  const onInput = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  const details = [
    { label: "Số lượng sản phẩm", value: totalAmount, post: "" },
    { label: "Tổng tiền hàng", value: totalPrice, post: "₫" },
    { label: "Giảm giá", value: 0, post: "₫" },
    { label: "Vận chuyển", value: 0, post: "₫" },
    {
      label: "Tổng giá trị đơn hàng",
      value: total,
      post: "₫",
      sub: "Thanh toán khi giao hàng (COD)",
    },
    {
      label: "Đã thanh toán",
      value: deliveryDate ? totalPrice : 0,
      post: "₫",
    },
  ];

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
            let newOrder = { ...order };
            newOrder = updateOrder(newOrder, res);
            setOrder(newOrder);
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
        let newOrder = { ...order };
        newOrder = updateOrder(newOrder, res);
        setOrder(newOrder);
      });
    }
  };

  const handleDelivery = (e) => {
    if (e.target.className.includes("disabled")) return;

    const now = new Date().toISOString();
    handleUpdateOrder(
      parseInt(id),
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

  const handleDelivered = (e) => {
    if (e.target.className.includes("disabled")) return;
    const now = new Date().toISOString();

    handleUpdateOrder(
      parseInt(id),
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

  const handleCancel = (e) => {
    if (e.target.className.includes("disabled")) return;

    const now = new Date().toISOString();
    console.log(now);
    handleUpdateOrder(
      parseInt(id),
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

  const handleConfirm = (e) => {
    if (e.target.className.includes("disabled")) return;

    const now = new Date().toISOString();
    handleUpdateOrder(
      parseInt(id),
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

  const handleSaveNote = () => {
    handleUpdateOrder(
      parseInt(id),
      status,
      deliveryDate,
      beginDelivery,
      cancelDate,
      confirmDate,
      txtNote,
      false
    );
  };

  return (
    <div className="order-detail--wrapper">
      <ABreadcrumb title={`Đơn hàng #${id}`} list={BREADCRUMB} />
      <div className="order-detail--header">
        <div className="row align-items-start">
          <div className="col">
            <div className="order-detail--list-status">
              <div className="order-detail--info">
                <div className="order-detail--info--label pl-0">Mã</div>
                <div className="order-detail--info--detail">
                  <div className="table-break-word">
                    <strong className="order-detail--info--detail-name">
                      {`#${id}`}
                    </strong>
                  </div>
                </div>
              </div>
              <div className="order-detail--info">
                <div className="order-detail--info--label pl-0">Ngày tạo</div>
                <div className="order-detail--info--detail">
                  <div className="table-break-word">
                    <span className="order-detail--info--detail-name">
                      {formatDateTime(new Date(createDate))}
                    </span>
                  </div>
                </div>
              </div>
              <div className="order-detail--info">
                <div className="order-detail--info--label pl-0">
                  Trạng thái đơn hàng
                </div>
                <div className="order-detail--info--detail">
                  <div className="table-break-word">
                    <span className="order-detail--info--detail-name">
                      <div className="status--component">
                        <span
                          className={`circle--status mr-2 circle--status--${status}`}
                        ></span>
                        <span className={`badges--status--${status}`}>
                          {formatStatus(status)}
                        </span>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
              {status < CANCEL && (
                <div className="order-detail--info">
                  <div className="order-detail--info--label pl-0">
                    Trạng thái giao hàng
                  </div>
                  <div className="order-detail--info--detail d-flex">
                    <div className="table-break-word">
                      <span className="order-detail--info--detail-name">
                        <div className="status--component">
                          <span
                            className={`circle--status mr-2 circle--status--${delivery}`}
                          ></span>
                          <span className={`badges--status--${delivery}`}>
                            {formatDelivery()}
                          </span>
                        </div>
                      </span>
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
          <div className="col-auto">
            <OutsideClickWrapper
              className="d-inline-block ml-3 mt-2"
              onClickOutside={() => setDropdown(false)}
              isShowing={dropdown}
            >
              <div
                className={`dropdown dd-arrow-right dd-placement-right ${
                  dropdown ? "dd-popover--contains" : ""
                }`}
              >
                <div>
                  <button
                    className="btn btn-clean btn-fix-height btn-bg"
                    onClick={() => setDropdown(!dropdown)}
                  >
                    <span className="mr-2">Thao tác</span>
                    <i
                      className="icon-arrow-down"
                      style={{ fontSize: "10px" }}
                    />
                  </button>
                </div>
                <div
                  className={`dd-popover ${dropdown ? "dd-popover--show" : ""}`}
                >
                  <div className="dd-popover__tooltip"></div>
                  <div className="dd-popover__content-wrapper">
                    <div
                      className="dd-popover__content"
                      style={{ width: "160px" }}
                    >
                      <div className="dd-popover__pane">
                        <div className="my-2">
                          <p
                            className={`ellipsis-item ${
                              status === CONFIRM
                                ? beginDelivery
                                  ? "disabled"
                                  : ""
                                : "disabled"
                            }`}
                            onClick={handleDelivery}
                          >
                            Bắt đầu giao hàng
                          </p>
                          <p
                            className={`ellipsis-item ${
                              status === CONFIRM
                                ? beginDelivery
                                  ? !deliveryDate
                                    ? ""
                                    : "disabled"
                                  : "disabled"
                                : "disabled"
                            }`}
                            onClick={handleDelivered}
                          >
                            Hoàn tất giao hàng
                          </p>
                          <p
                            className={`ellipsis-item ${
                              status < CANCEL ? "" : "disabled"
                            }`}
                            onClick={handleCancel}
                          >
                            Huỷ đơn hàng
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </OutsideClickWrapper>
            <div className="d-inline-block ml-3 mt-2">
              <button className="btn btn-clean btn-bg" onClick={handlePrint}>
                <span>
                  <i
                    className="icon-printer mr-2"
                    style={{ fontSize: "16px" }}
                  />
                  <span>In</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div style={{ padding: "30px 0", margin: "0 auto" }}>
        {status === CANCEL && (
          <div className="row">
            <div className="col-lg-9 col-12">
              <div className="card mb-5">
                <div className="ss-alert ss-alert-warning ss-alert-has-icon ss-alert-with-description">
                  <div className="ss-alert-icon">
                    <Warning />
                  </div>
                  <div className="ss-alert-message">
                    <div className="mt-1">Hủy đơn hàng</div>
                  </div>
                  <div className="ss-alert-description">
                    <div className="row" style={{ paddingTop: "10px" }}>
                      <div className="col-auto">
                        <span>
                          {`Đơn hàng đã được hủy vào lúc `}
                          <strong>
                            {formatDateTime(new Date(cancelDate))}
                          </strong>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="row">
          <div className="col-lg-9 col-12">
            <div className="card mb-5 position-relative">
              <div style={{ padding: "16px" }}>
                <div className="content--head">
                  <div className="d-flex">
                    <span className="content--title">Danh sách sản phẩm</span>
                  </div>
                </div>
                <div className="content--body">
                  <div style={{ marginTop: "16px" }}>
                    <div className="table--container">
                      <table className="ui-table ui-table-vertical-top">
                        <thead>
                          <tr>
                            <th className="table-header--product"></th>
                            <th className="text-center table-header--amount">
                              Số lượng
                            </th>
                            <th className="text-right table-header--amount">
                              Giá (đ)
                            </th>
                            <th className="text-right table-header--amount">
                              Thành tiền (đ)
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {items &&
                            items.map((item, index) => (
                              <Product {...item} key={index} />
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card mb-5">
              <div style={{ padding: "16px" }}>
                <div className="content--body">
                  <div className="form-group px-0 pb-0">
                    <div className="row">
                      <div className="col-sm-6">
                        <div style={{ marginBottom: "15px" }}>
                          <label className="title-level--sub">
                            Ghi chú đơn hàng
                          </label>
                          <textarea
                            value={txtNote}
                            onChange={(e) => setNote(e.target.value)}
                            id="order--note"
                            placeholder="Thêm ghi chú cho đơn hàng"
                            rows={1}
                            className="table-textarea"
                          ></textarea>
                        </div>
                        <div style={{ marginBottom: "15px" }}>
                          <button
                            className="btn btn-primary"
                            onClick={handleSaveNote}
                          >
                            <span>Cập nhật</span>
                          </button>
                        </div>
                      </div>
                      <div className="col-sm-6">
                        {details.map((detail, index) => (
                          <Row {...detail} key={index} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-12">
            {status < CANCEL && (
              <div className="card mb-5">
                <div style={{ padding: "16px" }}>
                  <div className="content--head">
                    <span className="content--title mb-0">
                      Xác nhận Đơn hàng
                    </span>
                  </div>
                  <div className="content--body">
                    <div className="form-group px-0 pb-0">
                      {status === WAITING && (
                        <>
                          <div style={{ marginBottom: "16px" }}>
                            Vui lòng xác nhận đơn hàng
                          </div>
                          <button
                            className="btn btn-primary w-100"
                            onClick={handleConfirm}
                          >
                            Xác nhận đơn hàng
                          </button>
                        </>
                      )}
                      {status === CONFIRM && (
                        <>
                          <Verify />
                          <span>Đơn hàng đã được xác nhận</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="card mb-5">
              <div style={{ padding: "16px" }}>
                <div className="content--head">
                  <span className="content--title mb-0">
                    Thông tin người mua
                  </span>
                </div>
                <div className="content--body">
                  <div className="form-group px-0 pb-0">
                    <Link
                      className="mb-2 d-block"
                      target="_blank"
                      to={`/admin/customer/${customerId}`}
                    >
                      {customerName}
                    </Link>
                    <p className="mb-0 color-gray-solid table-break-word">
                      {customerEmail}
                    </p>
                  </div>
                </div>
                <div className="content--body" style={{ paddingTop: "16px" }}>
                  <div className="row no-gutters align-item-center">
                    <div className="col">
                      <p className="mb-0 content--title">Thông tin giao hàng</p>
                    </div>
                  </div>
                  <div
                    className="form-group px-0 pb-0"
                    style={{ marginBottom: 0 }}
                  >
                    <p className="mb-0 color-gray-solid table-break-word">
                      Người nhận:
                    </p>
                    <p className="mb-0 text-black">{receiverName}</p>
                  </div>
                  <div
                    className="form-group px-0 pb-0"
                    style={{ marginBottom: 0 }}
                  >
                    <p className="mb-0 color-gray-solid table-break-word">
                      Số điện thoại:
                    </p>
                    <p className="mb-0 text-black">{phone}</p>
                  </div>
                  <div
                    className="form-group px-0 pb-0"
                    style={{ marginBottom: 0 }}
                  >
                    <p className="mb-0 color-gray-solid table-break-word">
                      Địa chỉ nhận:
                    </p>
                    <p className="mb-0 text-black">{address}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-none">
        <ProductToPrint ref={componentRef} {...props} />
      </div>
    </div>
  );
}

export default AOrderDetail;

const Product = ({ id, name, img, price, amount, total }) => (
  <tr>
    <td className="align-middle text-normal fix-overflow-tooltip">
      <div className="order-block--table">
        <div className="order-block--table-image">
          <div className="table-cell--image">
            <img className="box-image" src={img} alt="product" />
          </div>
        </div>
        <div className="order-block--table-content">
          <Link target="_blank" to={`/admin/shoes/${id}`}>
            <strong className="text-primary mb-2 d-inline-block">{name}</strong>
          </Link>
          <div className="mb-2 text-secondary">Màu: Hồng, Size: 40</div>
        </div>
      </div>
    </td>
    <td className="align-middle text-center">
      <div className="border-0">{amount}</div>
    </td>
    <td className="align-middle text-right">
      <div className="border-0 text-right">{`${price} ₫`}</div>
    </td>
    <td className="align-middle text-right">
      <div className="border-0 text-right">{`${total} ₫`}</div>
    </td>
  </tr>
);

const Row = ({ label, value, post, sub }) => (
  <div style={{ paddingBottom: "10px", fontSize: "14px" }}>
    <div className="row">
      <div className="col">
        {!sub ? (
          label
        ) : (
          <>
            <p className="mb-1" style={{ fontWeight: "bold" }}>
              {label}
            </p>
            <p className="text-secondary mb-0">{sub}</p>
          </>
        )}
      </div>
      <div className="col-auto text-right">{`${value} ${post}`}</div>
    </div>
  </div>
);
