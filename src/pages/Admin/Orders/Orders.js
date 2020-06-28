import React, { useEffect, useState } from "react";
import ABreadcrumb from "Components/Admin/Breadcrumb/Breadcrumb";
import { Link } from "react-router-dom";
import "./Orders.scss";
import { useDispatch } from "react-redux";
import { getOrderAction } from "state/actions/index";
import APagination from "Components/Admin/Pagination/Pagination";
import { NoDataComponent } from "utils/utils";
import { formatDateTime } from "utils/helper";
import history from "state/history";
import qs from "query-string";
// import AFilterBar from "Components/Admin/FilterBar/FilterBar";

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
      deliveryDate: r.DeliveryDate,
      receiverName: r.RecipientName,
      phone: r.RecipientPhoneNumber,
      status: r.Status,
      total: r.Total,
      customerId: r.CustomerId,
      customerName: r.Customer.Name,
    }));

  const fetchOrder = (page, pageSize) => {
    const pageQuery = page > 1 ? page : null;
    const pageSizeQuery = pageSize > 10 ? pageSize : null;
    const query = qs.stringify(
      { page: pageQuery, pageSize: pageSizeQuery },
      { skipNull: true }
    );

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
    const search = qs.stringify({ page, "page-size": pageSize });
    history.push(`?${search}`);

    setPage(page);
    fetchOrder(page, pageSize);
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
            // handlePerPageChange={handlePerPageChange}
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
  deliveryDate,
  receiverName,
  phone,
  total,
  customerId,
  customerName,
}) => {
  const formatStatus = (stt) =>
    stt === 1 ? "Chờ xác nhận" : stt === 2 ? "Đã xác nhận" : "Đã huỷ";

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
                  <Link to={`/admin/orders/${id}`}>
                    <strong>{`#${id}`}</strong>
                  </Link>
                </div>
              </div>
            </div>
            <div className="order--status--item pb-4">
              <div className="order--status--item--top">Ngày đặt hàng</div>
              <div className="order--status--item--bottom">
                <div className="table-break-word">
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
                    <span className="badges--status--1">
                      {formatStatus(status)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="order--status--item pb-4">
              <div className="order--status--item--top">Giao hàng</div>
              <div className="order--status--item--bottom">
                <div className="table-break-word">
                  <div className="status--component">
                    <span className="circle--status mr-2 circle--status--1"></span>
                    <span className="badges--status--1">Chưa giao hàng</span>
                  </div>
                </div>
              </div>
            </div>
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
            <Product img="https://product.hstatic.net/200000021246/product/mug-today-is-a-good-day_f3d1123c921349aeb926e94558d1c76c_165a399708af406396565195430dfcef_small.jpg" />
            <Product img="https://product.hstatic.net/200000021246/product/mug-today-is-a-good-day_f3d1123c921349aeb926e94558d1c76c_165a399708af406396565195430dfcef_small.jpg" />
            <div className="py-3 px-0 text-right">
              <strong>Tổng: 31,990,000 ₫</strong>
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
              <Link to={`/admin/customer/1`} target="_blank">
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
          <button className="btn btn-clean mb-4">
            <i className="icon-printer mr-3" />
            In đơn hàng
          </button>
          <button className="btn btn-clean mb-4">
            <i className="icon-close mr-3" />
            Huỷ đơn hàng
          </button>
          <div className="float-right text-right">
            <button className="btn btn-default mb-4 ml-3">
              Xác nhận đơn hàng
            </button>
            <button className="btn btn-default mb-4 ml-3">
              <i className="flaticon-delivery-truck mr-2" />
              Bắt đầu giao hàng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Product = ({ img }) => (
  <div className="order--product--item py-3 px-0">
    <div className="product--image">
      <div className="table-cell--image mr-2">
        <img className="box--image" src={img} alt="product avatar" />
      </div>
      <div className="table-cell--info">
        <Link to={`/admin/shoes/1`} target="_blank">
          <strong className="text-primary mb-2 d-inline-block">
            iMac 21.5 inch 2017 MMQA2
          </strong>
        </Link>
      </div>
    </div>
    <div className="border--0 text-right">
      <div>x 1</div>
      <span>22,090,000 đ</span>
    </div>
  </div>
);
