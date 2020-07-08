import React, { useState, useCallback, useMemo, useEffect } from "react";
import ABreadcrumb from "Components/Admin/Breadcrumb/Breadcrumb";
import DataTable from "react-data-table-component";
import { customStyles } from "constants/index";
import { OPTIONS } from "utils/utils";
import "./NewImport.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_SHOES,
  GET_SIZES,
  GET_COLORS,
  GET_PROVIDERS,
  ADD_PROVIDERS,
} from "state/reducers/AShoesReducer";
import AddShoesModal from "Components/Admin/Modal/AddShoes";
import swal from "sweetalert";
import AProviderSelect from "Components/Admin/Creatable/ProviderSelect";
import AProductSelect from "Components/Admin/ProductSelect/Select";
import { addImportAction } from "state/actions/index";
import { toastErr } from "utils/index";
import ChooseShoesModal from "Components/Admin/Modal/ChooseShoes";

function ANewImport() {
  // List state
  const [loadData, setLoadData] = useState(false);
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [options, setOptions] = useState([{ value: 0, label: "" }]);
  const [addModal, setShowAddModal] = useState(false);
  const [chooeseModal, setShowChooseModal] = useState(false);
  const [provider, setProvider] = useState(null);

  const handleCloseAddModal = () => setShowAddModal(false);
  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseChooseModal = () => setShowChooseModal(false);
  const handleShowChooseModal = () => setShowChooseModal(true);

  // create dispatch
  const dispatch = useDispatch();

  // create selector <=> mapStateToProps
  const shoes = useSelector((state) => state.aShoes.shoes);
  const sizes = useSelector((state) => state.aShoes.sizes);
  const colors = useSelector((state) => state.aShoes.colors);

  if (!loadData && shoes.length) {
    setLoadData(true);
    const newOptions = shoes.map((s) => ({ value: s.Id, label: s.Name }));
    setOptions(newOptions);
  }

  // componentDidMount => get shoes one time when page is loaded
  useEffect(() => {
    dispatch({ type: GET_SHOES });
    dispatch({ type: GET_SIZES });
    dispatch({ type: GET_COLORS });
  }, [dispatch]);

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

  const columns = [
    {
      name: "Chi tiết giày",
      selector: "name",
      sortable: true,
      cell: (row) => (
        <div style={{ display: "flex", width: "100%" }}>
          <div style={{ flexGrow: 3 }}>
            <AProductSelect
              options={options}
              className="product-select"
              selectedOption={row.shoes}
              placeholder="Chọn sản phẩm"
              disabled
            />
          </div>
          <div style={{ flexGrow: 2 }} className="ml-2">
            <AProductSelect
              options={row.stocks}
              className="product-select"
              selectedOption={row.stock}
              placeholder="Chọn phiên bản"
              disabled
            />
          </div>
        </div>
      ),
    },
    {
      name: "Giá nhập",
      selector: "price",
      maxWidth: "170px",
      sortable: true,
      right: true,
      format: (row) => `${row.price} VNĐ`,
    },
    {
      name: "Số lượng",
      selector: "amount",
      maxWidth: "130px",
      sortable: true,
      right: true,
      format: (row) => `${row.price} đôi`,
    },
  ];

  const addNewItem = (newItem) => {
    const id = data.length ? data + 1 : 0;
    const item = { ...newItem, id };

    let newData = [item, ...data];
    setData(newData);
  };

  const actions = (
    <>
      <button className="btn btn-info" onClick={handleShowAddModal}>
        Thêm sản phẩm
      </button>
      <button className="btn btn-primary" onClick={handleShowChooseModal}>
        Thêm mới
      </button>
    </>
  );

  const validateRow = (row) => {
    if (!row.stockId || !row.price || !row.amount) return false;

    return true;
  };

  const validateData = () => {
    if (!provider) return false;
    if (!data.length) return false;

    for (let i = 0; i < data.length; i++) {
      if (!validateRow(data[i])) return false;
    }

    return true;
  };

  const resetForm = () => {
    setData([]);
    setProvider(null);
  };

  const handleResetForm = () => {
    swal("Dữ liệu chưa được lưu. Bạn chắn chắn chứ?", {
      buttons: ["Trở lại", "Chắc chắn"],
      icon: "warning",
    }).then((willReset) => {
      if (willReset) {
        resetForm();
      } else {
        swal("Chúc mừng dữ liệu của bạn vẫn an toàn!");
      }
    });
  };

  const updateDB = (e) => {
    swal("Bạn đã chắc chắn muốn cập nhật chưa?", {
      buttons: ["Trở lại", "Chắc chắn"],
      icon: "info ",
    }).then(() => {
      if (!validateData()) {
        swal(
          "Dữ liệu nhập vào không hợp lệ. Vui lòng kiểm tra và thử lại sau",
          {
            icon: "error",
          }
        );
      } else {
        const details = data.map((d) => ({
          quantity: parseInt(d.amount),
          originalPrice: parseFloat(d.price),
          stockId: d.stockId,
        }));

        dispatch(addImportAction({ providerId: provider.value, details }))
          .then((res) => {
            resetForm();
            swal("Yêu cầu của bạn đã được thực hiện", {
              icon: "success",
            });
          })
          .catch((err) => toastErr(err));
      }
    });
  };

  return (
    <div className="create-import">
      <ABreadcrumb title="Nhập hàng mới" list={BREADCRUMB} />
      <div className="row" style={{ justifyContent: "center" }}>
        <div className="col-md-6">
          <div className="card">
            <div className="form-group form-inline">
              <label htmlFor="inlineinput" className="col-md-3 col-form-label">
                Nhà cung cấp
              </label>
              <div className="col-md-8 p-0 ml-2">
                <AProviderSelect
                  selected={provider}
                  setSelected={setProvider}
                  getReducer={GET_PROVIDERS}
                  addReducer={ADD_PROVIDERS}
                  stateName="providers"
                  placeholder="Chọn nhà cung cấp ..."
                />
              </div>
            </div>
          </div>
        </div>
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
              noDataComponent="Danh sách hiện tại còn trống"
            />
            <div className="card-action">
              <button className="btn btn-success" onClick={updateDB}>
                Cập nhật
              </button>
              <button className="btn btn-danger ml-1" onClick={handleResetForm}>
                Huỷ
              </button>
            </div>
          </div>
        </div>
      </div>
      <AddShoesModal show={addModal} handleClose={handleCloseAddModal} />
      <ChooseShoesModal
        show={chooeseModal}
        handleClose={handleCloseChooseModal}
        options={options}
        shoesList={shoes}
        colors={colors}
        sizes={sizes}
        addNewItem={addNewItem}
      />
    </div>
  );
}

export default ANewImport;

const BREADCRUMB = [
  { link: "/admin/shoes", name: "Quản lý giày" },
  { link: "/admin/shoes/add", name: "Thêm mới" },
];
