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
import { downloadCSV, downloadExcel } from "utils/helper";
import { GET_SHOESBRANDS, GET_SHOESTYPES } from "state/reducers/AShoesReducer";
import ATag from "Components/Admin/Tags/Tag";

const SELECT = "select";
const VALUE = "value";

const COMPARES = [
  { value: "min", label: "lớn hơn hoặc bằng" },
  { value: "equal", label: "bằng" },
  { value: "max", label: "nhỏ hơn hoặc bằng" },
];

function AShoesList({ location: { search } }) {
  // state
  const [data, setData] = useState([]);
  const [fetch, setFetch] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState(null);

  // lifecycle

  // redux
  const dispatch = useDispatch();
  const shoes = useSelector((state) => state.aShoes.shoes);
  const shoesTypes = useSelector((state) => state.aShoes.shoesTypes);
  const shoesBrands = useSelector((state) => state.aShoes.shoesBrands);
  const totalRows = useSelector((state) => state.aShoes.totalRows) || 0;

  const fetchShoes = (page, pageSize, filter) => {
    const pageQuery = page > 1 ? page : null;
    const pageSizeQuery = pageSize > 10 ? pageSize : null;
    const query = qs.stringify(
      { page: pageQuery, pageSize: pageSizeQuery },
      { skipNull: true }
    );
    let f = "";
    for (var key in filter) {
      f += `&${key}=${filter[key]}`;
    }
    history.push(`?${query}${f}`);

    dispatch(getShoesAction({ pageSize, page, filter }))
      .then((res) => {
        let newData = mapResponseToData(res);
        setData(newData);
      })
      .catch((err) => toastErr(err));
  };

  if (!fetch) {
    setFetch(true);
    const parsed = qs.parse(search);

    let { page, "page-size": pageSize, ...filter } = parsed;

    page = page || 1;
    pageSize = pageSize || 10;

    fetchShoes(page, pageSize, filter);

    dispatch({ type: GET_SHOESTYPES });
    dispatch({ type: GET_SHOESBRANDS });

    setPage(parseInt(page));
    setPerPage(pageSize);
    setFilter(filter);
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
  }, [data, dispatch, selectedRows, toggleCleared]);

  const handlePageChange = (page) => {
    const search = qs.stringify({ page, "page-size": perPage });
    history.push(`?${search}`);

    setPage(page);
    fetchShoes(page, perPage, filter);
  };

  const handlePerPageChange = (event) => {
    const pageSize = event.target.value;

    const search = qs.stringify({ page: 1, "page-size": pageSize });
    history.push(`?${search}`);

    setPerPage(pageSize);
    setPage(1);
    fetchShoes(1, pageSize, filter);
  };

  const handleDownload = (source, type) => {
    if (type === "csv") {
      if (source === "current") {
        downloadCSV(data, "shoes");
      }
    } else {
      downloadExcel(data, "shoes");
    }
  };

  const filters = {
    styleId: shoesTypes.map((s) => ({ value: s.Id, label: s.Name })),
    brandId: shoesBrands.map((s) => ({ value: s.Id, label: s.Name })),
  };

  const handleAddFilter = (selected, value, number) => {
    const { type, name } = selected.value;

    if (type === SELECT) {
      const newFilter = { ...filter, [name]: value };
      setFilter(newFilter);
      fetchShoes(1, 10, newFilter);
    } else if (type === VALUE) {
      const key = `${value}${name}`;
      const newFilter = { ...filter, [key]: number };
      setFilter(newFilter);
      fetchShoes(1, 10, newFilter);
    }
  };

  const handleSearch = (key) => {
    let newFilter = { ...filter, search: key };

    if (!key) {
      delete newFilter["search"];
    }

    console.log(newFilter);

    setFilter(newFilter);
    fetchShoes(1, 10, newFilter);
  };

  const handleRemoveTag = (key) => {
    let newFilter = { ...filter };

    delete newFilter[key];
    setFilter(newFilter);

    fetchShoes(1, 10, newFilter);
  };

  const renderTags = () => {
    let res = [];
    for (let key in filter) {
      if (key.includes("price")) {
        const com = COMPARES.find((c) => c.value === key.substring(0, 3));

        res.push(
          <ATag
            id={key}
            name="Giá tiền"
            value={filter[key]}
            handleRemoveTag={handleRemoveTag}
            connect={com.label}
          />
        );
      } else {
        const value =
          filters[key] && filters[key].find((s) => s.value == filter[key]);

        value &&
          res.push(
            <ATag
              id={key}
              name={MAP_NAME_TO_TAG[key]}
              value={value.label}
              handleRemoveTag={handleRemoveTag}
            />
          );
      }
    }

    return res;
  };

  const tags = renderTags();

  return (
    <div>
      <ABreadcrumb title="Tất cả sản phẩm" list={BREADCRUMB} />
      <AFilterBar
        onExport={(source, type) => handleDownload(source, type)}
        options={FILTERS}
        filters={filters}
        handleAddFilter={handleAddFilter}
        handleSearch={handleSearch}
      />
      <div className="row selected" style={{ marginTop: "10px" }}>
        <div className="col filter-render-selected">{tags}</div>
      </div>
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

const FILTERS = [
  { value: { type: SELECT, name: "styleId" }, label: "Loại sản phẩm" },
  { value: { type: SELECT, name: "brandId" }, label: "Thương hiệu" },
  { value: { type: VALUE, name: "price" }, label: "Giá tiền" },
];

const MAP_NAME_TO_TAG = {
  styleId: "Loại sản phẩm",
  brandId: "Thương hiệu",
  price: "Giá tiền",
};
