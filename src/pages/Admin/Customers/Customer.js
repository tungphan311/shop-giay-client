import React, { useState } from "react";
import ABreadcrumb from "Components/Admin/Breadcrumb/Breadcrumb";
import { customStyles } from "constants/index";
import { OPTIONS, NO_DATA_COMPONENT } from "utils/utils";
import APagination from "Components/Admin/Pagination/Pagination";
import DataTable from "react-data-table-component";
import history from "state/history";
import AFilterBar from "Components/Admin/FilterBar/FilterBar";

function ACustomer() {
  // state
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const columns = [
    {
      name: "Chi tiết giày",
      selector: "name",
      sortable: true,
      cell: (row) => (
        <div className="d-flex" style={{ padding: "15px 0" }}>
          <div className="cell--image">
            <img
              src={row.img.length ? row.img[0].ImagePath : ""}
              alt="shoes"
              className="shoes__ava"
            />
          </div>
          <div className="ml-3 align-self-center">
            <div
              className="cell--info"
              onClick={() => history.push(`/admin/shoes/${row.id}`)}
            >
              {row.name}
            </div>
            <div className="mt-2 cell--ver">{`${row.inventory} phiên bản`}</div>
          </div>
        </div>
      ),
    },
    {
      name: "Tồn kho",
      selector: "inventory",
      maxWidth: "150px",
      sortable: true,
      center: true,
    },
    {
      name: "Loại sản phẩm",
      selector: "type",
      maxWidth: "250px",
      sortable: true,
      center: true,
    },
    {
      name: "Thương hiệu",
      selector: "brand",
      maxWidth: "250px",
      sortable: true,
      center: true,
    },
  ];

  return (
    <div>
      <ABreadcrumb title="Danh sách khách hàng" list={BREADCRUMB} />
      <AFilterBar />
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
              noDataComponent={NO_DATA_COMPONENT}
              paginationComponent={() => (
                <APagination
                  page={page}
                  //   handlePageChange={(page) => handlePageChange(page)}
                  totalRows={10}
                  perPage={perPage}
                  pageSizes={[10, 15, 20, 25]}
                  //   handlePerPageChange={handlePerPageChange}
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
