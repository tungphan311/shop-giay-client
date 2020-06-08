import React, {
  Component,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import ABreadcrumb from "Components/Admin/Breadcrumb/Breadcrumb";
import { useSelector, useDispatch } from "react-redux";
import DataTable from "react-data-table-component";
import { customStyles } from "constants/index";
import { OPTIONS, NO_DATA_COMPONENT } from "utils/utils";
import { getShoesAction, deleteShoesAction } from "state/actions/index";
import { toastErr } from "utils/index";
import "./ShoesList.scss";
import history from "state/history";
import swal from "sweetalert";

function AShoesList() {
  // state
  const [data, setData] = useState([]);
  const [fetch, setFetch] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [loading, setLoading] = useState(true);

  // lifecycle

  // redux
  const dispatch = useDispatch();
  const shoes = useSelector((state) => state.aShoes.shoes);

  if (!shoes.length && !fetch) {
    setFetch(true);
    dispatch(getShoesAction())
      .then((res) => {
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

  const handleRowSelected = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = useMemo(() => {
    const handleDelete = () => {
      swal({
        title: "Bạn có chắc không?",
        text: "Một khi xoá, bạn không thể khôi phục những dòng đã chọn!",
        icon: "warning",
        buttons: ["Huỷ", "Xoá"],
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          setToggleCleared(!toggleCleared);
          setData(data.filter((x) => !selectedRows.includes(x)));
          setLoading(true);
          // dispatch(deleteShoesAction())
          // swal("Chúc mừng bạn đã xoá thành công", {
          //   icon: "success",
          // });
        } else {
          setToggleCleared(!toggleCleared);
          swal("Chúc mừng dữ liệu của bạn vẫn an toàn!");
        }
      });
    };

    return (
      <button
        onClick={handleDelete}
        className="btn btn-icon btn-round btn-danger"
      >
        <i className="fa fa-trash" />
      </button>
    );
  }, [data, selectedRows, toggleCleared]);

  console.log(selectedRows);

  return (
    <div>
      <ABreadcrumb title="Tất cả sản phẩm" list={BREADCRUMB} />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <DataTable
              title="Tất cả sản phẩm"
              customStyles={customStyles}
              columns={columns}
              data={data}
              selectableRows
              contextActions={contextActions}
              onSelectedRowsChange={handleRowSelected}
              clearSelectedRows={toggleCleared}
              pagination
              striped
              highlightOnHover
              paginationComponentOptions={OPTIONS}
              noDataComponent={NO_DATA_COMPONENT}
              // progressPending={loading}
              // progressComponent={<Loading />}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AShoesList;

const BREADCRUMB = [{ link: "/admin/shoes", name: "Quản lý giày" }];

const Loading = () => (
  <>
    <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
    <span class="sr-only">Loading...</span>
  </>
);
