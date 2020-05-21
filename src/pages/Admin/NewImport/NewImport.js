import React, { useState, useCallback, useMemo, useEffect } from "react";
import ABreadcrumb from "Components/Admin/Breadcrumb/Breadcrumb";
import DataTable from "react-data-table-component";
import { customStyles } from "constants/index";
import { OPTIONS, NO_DATA_COMPONENT } from "utils/utils";
import "./NewImport.scss";
import { useDispatch, useSelector } from "react-redux";
import { GET_SHOES } from "state/reducers/AShoesReducer";
import AProductSelect from "Components/Admin/ProductSelect/Select";
import AddShoesModal from "Components/Admin/Modal/AddShoes";
import swal from "sweetalert";

const DEFAULT_ITEM = {
  code: 0,
  name: "",
  amount: 0,
};

function ANewImport() {
  // List state
  const [loadData, setLoadData] = useState(false);
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [options, setOptions] = useState([{ value: 0, label: "" }]);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  // create dispatch
  const dispatch = useDispatch();

  // create selector <=> mapStateToProps
  const shoes = useSelector((state) => state.aShoes.shoes);

  if (!loadData && shoes.length) {
    setLoadData(true);
    const newOptions = shoes.map((s) => ({ value: s.Id, label: s.Name }));
    setOptions(newOptions);
  }

  // componentDidMount => get shoes one time when page is loaded
  useEffect(() => {
    dispatch({ type: GET_SHOES });
  }, []);

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
          swal("Chúc mừng bạn đã xoá thành công", {
            icon: "success",
          });
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

  const updateInputValue = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    const id = parseInt(e.target.id);

    let newData = [...data];

    const index = newData.findIndex((ele) => ele.id === id);

    newData[index] = {
      ...newData[index],
      [name]: parseInt(value),
    };

    setData(newData);
  };

  const selectProduct = (selected, id) => {
    let newData = [...data];

    const index = newData.findIndex((ele) => ele.id === id);

    newData[index] = {
      ...newData[index],
      code: selected.value,
      name: selected.label,
    };

    setData(newData);
  };

  const columns = [
    {
      name: "Tên giày (code)",
      selector: "name",
      sortable: true,
      cell: (row) => (
        <AProductSelect
          options={options}
          className="product-select"
          id={row.id}
          selectedOption={{ value: row.code, label: row.name }}
          onChange={(selected) => selectProduct(selected, row.id)}
          placeholder="Chọn mã sản phẩm"
        />
      ),
    },
    {
      name: "Số lượng",
      selector: "amount",
      sortable: true,
      cell: (row) => (
        <input
          type="number"
          name="amount"
          className="amount-input"
          id={row.id}
          defaultValue={row.amount}
          onBlur={updateInputValue}
        ></input>
      ),
    },
  ];

  const actions = (
    <>
      <button className="btn btn-info" onClick={() => setShowModal(true)}>
        Thêm sản phẩm
      </button>
      <button className="btn btn-primary" onClick={() => addNewItem()}>
        Thêm mới
      </button>
    </>
  );

  const addNewItem = () => {
    const id = data.length ? data[0].id + 1 : 0;
    const item = { ...DEFAULT_ITEM, id };

    let newData = [item, ...data];
    setData(newData);
  };

  const updateDB = (e) => {
    // console.log(e.target);
  };

  return (
    <div>
      <ABreadcrumb title="Nhập hàng mới" list={BREADCRUMB} />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <DataTable
              title="Danh sách giày nhập mới"
              customStyles={customStyles}
              columns={columns}
              data={data}
              selectableRows
              actions={actions}
              contextActions={contextActions}
              onSelectedRowsChange={handleRowSelected}
              clearSelectedRows={toggleCleared}
              pagination
              striped
              highlightOnHover
              paginationComponentOptions={OPTIONS}
              noDataComponent={NO_DATA_COMPONENT}
            />
            <div className="card-action">
              <button className="btn btn-success" onClick={updateDB}>
                Cập nhật
              </button>
              <button className="btn btn-danger ml-1">Huỷ</button>
            </div>
          </div>
        </div>
      </div>
      <AddShoesModal
        show={showModal}
        handleClose={handleClose}
        // handleAdd={handleAdd}
        // handleAddAndClose={handleAddAndClose}
      />
    </div>
  );
}

export default ANewImport;

const BREADCRUMB = [
  { link: "/admin/shoes", name: "Quản lý giày" },
  { link: "/admin/shoes/add", name: "Thêm mới" },
];
