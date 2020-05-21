import React, { useState, useMemo, useCallback } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import ABreadcrumb from "Components/Admin/Breadcrumb/Breadcrumb";
import differenceBy from "lodash/differenceBy";
import { OPTIONS, NO_DATA_COMPONENT } from "utils/utils";
import AddShoesModal from "Components/Admin/Modal/AddShoes";
import { customStyles } from "constants/index";

function AAddShoes() {
  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);
  const [data, setData] = useState(DATA);

  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleRowSelected = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = useMemo(() => {
    const handleDelete = () => {
      if (
        window.confirm(
          `Are you sure you want to delete:\r ${selectedRows.map(
            (r) => r.name
          )}?`
        )
      ) {
        setToggleCleared(!toggleCleared);
        setData(differenceBy(data, selectedRows, "name"));
      }
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

  const actions = (
    <button className="btn btn-primary" onClick={() => handleShow()}>
      Thêm mới
    </button>
  );

  const handleAdd = (shoes) => {
    const newData = [...data, shoes];
    setData(newData);
  };

  const handleAddAndClose = (shoes) => {
    const newData = [...data, shoes];
    setData(newData);
    setShowModal(false);
  };

  return (
    <div>
      <ABreadcrumb title="Thêm sản phẩm mới" list={BREADCRUMB} />
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
          </div>
        </div>
      </div>
      <AddShoesModal
        show={showModal}
        handleClose={handleClose}
        handleAdd={handleAdd}
        handleAddAndClose={handleAddAndClose}
      />
    </div>
  );
}

export default AAddShoes;

const BREADCRUMB = [
  { link: "/admin/shoes", name: "Quản lý giày" },
  { link: "/admin/shoes/add", name: "Thêm mới" },
];

const DATA = [];

// this is just an example of columns.
// TODO: change columns to shoes props in db
const columns = [
  {
    name: "Title",
    selector: "title",
    sortable: true,
  },
  {
    name: "Year",
    selector: "year",
    sortable: true,
  },
];
