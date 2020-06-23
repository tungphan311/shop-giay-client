import React, { useState } from "react";
import ABreadcrumb from "Components/Admin/Breadcrumb/Breadcrumb";
import { customStyles } from "constants/index";
import { OPTIONS, NoDataComponent } from "utils/utils";
import APagination from "Components/Admin/Pagination/Pagination";
import DataTable from "react-data-table-component";
import history from "state/history";
import AFilterBar from "Components/Admin/FilterBar/FilterBar";
import { useDispatch, useSelector } from "react-redux";
import qs from "query-string";
import { getCustomerAction, getGenderAction } from "state/actions/index";
import { toastErr } from "utils/index";
import { downloadCSV, downloadExcel } from "utils/helper";
import { GET_GENDER } from "state/reducers/aCustomerReducer";

const SELECT = "select";
const VALUE = "value";

function ACustomer({ location: { search } }) {
  // state
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [fetch, setFetch] = useState(false);
  const [filter, setFilter] = useState(null);

  // redux
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.aCustomer.customers);

  const fetchCustomer = (page, pageSize, filter) => {
    const search = qs.stringify({ page, "page-size": pageSize });
    let f = "";
    for (var key in filter) {
      f += `&${key}=${filter[key]}`;
    }
    history.push(`?${search}${f}`);

    if (customers.length) {
      let newData = mapResponseToData(customers);
      setData(newData);
    } else {
      dispatch(getCustomerAction({ page, pageSize, filter }))
        .then((res) => {
          const newData = mapResponseToData(res);
          setData(newData);
        })
        .catch((err) => toastErr(err));
    }
  };

  if (!fetch) {
    setFetch(true);

    const parsed = qs.parse(search);

    let { page, "page-size": pageSize, ...filter } = parsed;

    page = page || 1;
    pageSize = pageSize || 10;

    fetchCustomer(page, pageSize, filter);

    setPage(parseInt(page));
    setPerPage(parseInt(pageSize));
    setFilter(filter);
  }

  const mapResponseToData = (res) => {
    console.log(res);
    return res.map((s) => ({
      id: s.Id,
      name: s.Name,
      address: s.Addresses.length
        ? `${s.Addresses[0].District}, ${s.Addresses[0].City}`
        : "",
      orders: s.Orders.length,
      type: s.CustomerType.Name,
      gender: s.Gender === 1 ? "Nam" : s.Gender === 2 ? "Nữ" : "Khác",
    }));
  };

  const columns = [
    {
      name: "Khách hàng",
      selector: "name",
      sortable: true,
      cell: (row) => (
        <div
          className="cell--info"
          onClick={() => history.push(`/admin/customer/${row.id}`)}
        >
          {row.name}
        </div>
      ),
    },
    {
      name: "Giới tính",
      selector: "gender",
      sortable: true,
      maxWidth: "100px",
    },
    {
      name: "Địa chỉ",
      selector: "address",
      sortable: true,
      center: true,
    },
    {
      name: "Loại khách hàng",
      selector: "type",
      sortable: true,
      center: true,
      maxWidth: "20 0px",
    },
    {
      name: "Số đơn hàng",
      selector: "orders",
      sortable: true,
      center: true,
      maxWidth: "150px",
    },
  ];

  const filters = {
    styleId: [],
    brandId: [],
  };

  const handlePageChange = (page) => {
    const search = qs.stringify({ page, "page-size": perPage });
    history.push(`?${search}`);

    setPage(page);
    fetchCustomer(page, perPage, filter);
  };

  const handlePerPageChange = (event) => {
    const pageSize = event.target.value;

    const search = qs.stringify({ page: 1, "page-size": pageSize });
    history.push(`?${search}`);

    setPerPage(pageSize);
    setPage(1);
    fetchCustomer(1, pageSize, filter);
  };

  const handleDownload = (source, type) => {
    if (type === "csv") {
      if (source === "current") {
        downloadCSV(data, "customer");
      }
    } else {
      downloadExcel(data, "customer");
    }
  };

  return (
    <div>
      <ABreadcrumb title="Danh sách khách hàng" list={BREADCRUMB} />
      <AFilterBar
        onExport={(source, type) => handleDownload(source, type)}
        options={FILTERS}
        filters={filters}
      />
      <div className="row">
        <div className="col-md-12">
          <div className="card mt-4">
            <DataTable
              title="Danh sách khách hàng"
              customStyles={customStyles}
              columns={columns}
              data={data}
              selectableRows
              //   contextActions={contextActions}
              //   onSelectedRowsChange={handleRowSelected}
              clearSelectedRows={toggleCleared}
              pagination
              noHeader
              paginationServer
              //   paginationTotalRows={totalRows}
              striped
              highlightOnHover
              paginationComponentOptions={OPTIONS}
              noDataComponent={<NoDataComponent title="khách hàng" />}
              paginationComponent={() => (
                <APagination
                  page={page}
                  handlePageChange={(page) => handlePageChange(page)}
                  totalRows={10}
                  perPage={perPage}
                  pageSizes={[10, 15, 20, 25]}
                  handlePerPageChange={handlePerPageChange}
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ACustomer;

const BREADCRUMB = [{ link: "/admin/customers", name: "Danh sách khách hàng" }];

const FILTERS = [
  { value: { type: SELECT, name: "styleId" }, label: "Loại sản phẩm" },
  { value: { type: SELECT, name: "brandId" }, label: "Thương hiệu" },
  { value: { type: VALUE, name: "price" }, label: "Giá tiền" },
];
