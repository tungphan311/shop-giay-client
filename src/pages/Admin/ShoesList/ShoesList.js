import React, { Component, useState, useEffect } from "react";
import ABreadcrumb from "Components/Admin/Breadcrumb/Breadcrumb";
import { useSelector, useDispatch } from "react-redux";
import DataTable from "react-data-table-component";
import { customStyles } from "constants/index";
import { OPTIONS, NO_DATA_COMPONENT } from "utils/utils";
import { getShoesAction } from "state/actions/index";
import { toastErr } from "utils/index";
import "./ShoesList.scss";
import history from "state/history";

function AShoesList() {
  // state
  const [data, setData] = useState([]);
  const [fetch, setFetch] = useState(false);

  // lifecycle

  // redux
  const dispatch = useDispatch();
  const shoes = useSelector((state) => state.aShoes.shoes);

  if (!shoes.length && !fetch) {
    setFetch(true);
    dispatch(getShoesAction())
      .then((res) => {
        console.log(res);
        let newData = res.map((s) => ({
          id: s.Id,
          name: s.Name,
          stocks: s.Stocks,
          inventory: s.Stocks.reduce(
            (accumulator, currentValue) => accumulator + currentValue.Instock,
            0
          ),
          img: s.ShoesImages,
          type: s.ShoesType.Name,
          brand: s.ShoesBrand.Name,
        }));

        setData(newData);
      })
      .catch((err) => toastErr(err));
  }

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
      <ABreadcrumb title="Tất cả sản phẩm" list={BREADCRUMB} />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <DataTable
              title="Danh sách giày nhập mới"
              customStyles={customStyles}
              columns={columns}
              data={data}
              selectableRows
              // actions={actions}
              // contextActions={contextActions}
              // onSelectedRowsChange={handleRowSelected}
              // clearSelectedRows={toggleCleared}
              pagination
              striped
              highlightOnHover
              paginationComponentOptions={OPTIONS}
              noDataComponent={NO_DATA_COMPONENT}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AShoesList;

const BREADCRUMB = [{ link: "/admin/shoes", name: "Quản lý giày" }];
