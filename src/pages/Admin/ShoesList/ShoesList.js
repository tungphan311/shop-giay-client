import React, { useState, useCallback, useMemo } from "react";
import ABreadcrumb from "Components/Admin/Breadcrumb/Breadcrumb";
import { useSelector, useDispatch } from "react-redux";
import DataTable from "react-data-table-component";
import { customStyles } from "constants/index";
import { OPTIONS, NoDataComponent } from "utils/utils";
import { getShoesAction, deleteShoesAction } from "state/actions/index";
import { toastErr } from "utils/index";
import "./ShoesList.scss";
import history from "state/history";
import swal from "sweetalert";
import qs from "query-string";
import APagination from "Components/Admin/Pagination/Pagination";
import AFilterBar from "Components/Admin/FilterBar/FilterBar";
import { formatDateToString } from "utils/helper";

function AShoesList({ location: { search } }) {
  // state
  const [data, setData] = useState([]);
  const [fetch, setFetch] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);

  // lifecycle

  // redux
  const dispatch = useDispatch();
  const shoes = useSelector((state) => state.aShoes.shoes);
  const totalRows = useSelector((state) => state.aShoes.totalRows) || 0;

  const fetchShoes = (page, pageSize) => {
    dispatch(getShoesAction({ pageSize, page }))
      .then((res) => {
        let newData = mapResponseToData(res);
        setData(newData);
      })
      .catch((err) => toastErr(err));
  };

  if (!fetch) {
    setFetch(true);
    const parsed = qs.parse(search);

    const page = parsed.page || 1;
    setPage(parseInt(page));
    const pageSize = parsed.pageSize || 10;

    fetchShoes(page, pageSize);
    setPerPage(pageSize);
  } else if (!fetch && shoes.length) {
    setFetch(true);
    let newData = mapResponseToData(shoes);
    setData(newData);
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
            <div className="mt-2 cell--ver">{`${row.stocks.length} phiên bản`}</div>
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
      })
        .then((willDelete) => {
          if (willDelete) {
            const ids = selectedRows.map((s) => s.id);

            dispatch(deleteShoesAction(ids)).then(() => {
              swal("Chúc mừng bạn đã xoá thành công", {
                icon: "success",
              });
              setData(data.filter((x) => !selectedRows.includes(x)));
              setToggleCleared(!toggleCleared);
            });
          } else {
            setToggleCleared(!toggleCleared);
            swal("Chúc mừng dữ liệu của bạn vẫn an toàn!");
          }
        })
        .catch((err) => toastErr(err));
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

  const handlePageChange = (page) => {
    const search = qs.stringify({ page, pageSize: perPage });
    history.push(`?${search}`);

    setPage(page);
    fetchShoes(page, perPage);
  };

  const handlePerPageChange = (event) => {
    const pageSize = event.target.value;

    const search = qs.stringify({ page, pageSize });
    history.push(`?${search}`);

    setPerPage(pageSize);
    fetchShoes(page, pageSize);
  };

  const convertArrayOfObjectsToCSV = (array) => {
    console.log(array);
    let result;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(data[0]);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  };

  const downloadCSV = (source) => {
    let arr = [];
    if (source === "current") {
      arr = data;
    }

    const link = document.createElement("a");

    let csv = convertArrayOfObjectsToCSV(arr);
    if (!csv) return;

    const date = formatDateToString(new Date());
    const fileName = `shoes-${date}.csv`;
    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", fileName);
    link.click();
  };

  return (
    <div>
      <ABreadcrumb title="Tất cả sản phẩm" list={BREADCRUMB} />
      <AFilterBar onExport={(source) => downloadCSV(source)} />
      <div className="row mt-5">
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
              paginationServer
              paginationTotalRows={totalRows}
              striped
              highlightOnHover
              paginationComponentOptions={OPTIONS}
              noDataComponent={<NoDataComponent title="sản phẩm" />}
              paginationComponent={() => (
                <APagination
                  page={page}
                  handlePageChange={(page) => handlePageChange(page)}
                  totalRows={totalRows}
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

export default AShoesList;

const BREADCRUMB = [{ link: "/admin/shoes", name: "Quản lý giày" }];

const mapResponseToData = (res) =>
  res.map((s) => ({
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
