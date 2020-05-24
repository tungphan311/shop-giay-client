import React, { useState, useCallback, useMemo, useEffect } from "react";
import { reduxForm, Field } from "redux-form";
import { FORM_KEY_ADDSHOES } from "state/reducers/formReducer";
import DataTable from "react-data-table-component";
import AInput from "Components/Admin/AInput/input";
import ASelect from "Components/Admin/ASelect/select";
import { Button } from "react-bootstrap";
import "./AddStock.scss";
import AProductSelect from "Components/Admin/ProductSelect/Select";

function AAddStock({ handleSubmit, previousPage }) {
  const data = [{ id: 1, color: "Red", size: "S", amount: "5" }];

  const [selectedRows, setSelectedRows] = useState([]);
  const [toggleCleared, setToggleCleared] = useState(false);

  const handleRowSelected = useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);
  const columns = [
    {
      name: "Màu",
      selector: "color",
      sortable: true,
      cell: (row) => (
        <AProductSelect
          className="stock-selectcolor"
          id={row.id}
          selectedOption={{ value: row.code, label: row.name }}
          // onChange={(selected) => selectProduct(selected, row.id)}
          placeholder="Chọn màu"
        />
      ),
    },
    {
      name: "Kích cỡ",
      selector: "size",
      sortable: true,
      right: true,
      cell: (row) => (
        <AProductSelect
          className="stock-selectsize"
          id={row.id}
          selectedOption={{ value: row.code, label: row.name }}
          // onChange={(selected) => selectProduct(selected, row.id)}
          placeholder="Chọn Size"
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
          // onBlur={updateInputValue}
        ></input>
      ),
    },
  ];
  return (
    <form className="AddStockForm" onSubmit={handleSubmit}>
      <div className="stockTable">
        <div>
          <DataTable
            title="Stock"
            columns={columns}
            pagination
            striped
            selectableRows
            onSelectedRowsChange={handleRowSelected}
            clearSelectedRows={toggleCleared}
            highlightOnHover
            data={data}
          />
        </div>
        <div className="stockForm">
          <div className="displayRow">
            <Field
              label="Chọn màu"
              name="color"
              component={ASelect}
              formClassName="ml-2"
            />
            <Field
              label="Chọn size"
              name="size"
              component={ASelect}
              formClassName="ml-2"
            />
            <Field
              label="Số lượng"
              name="amount"
              component={AInput}
              formClassName="ml-2"
            />
          </div>
          <div className="displayCenter">
            <Button>Thêm</Button>
          </div>
        </div>
        <div style={{ marginLeft: "auto", marginRight: 0 }} className="mt-5">
          <button className="btn btn-primary btn-border" onClick={previousPage}>
            Trở về
          </button>
          <button type="submit" className="btn btn-primary ml-2">
            Hoàn tất
          </button>
        </div>
      </div>
    </form>
  );
}

AAddStock = reduxForm({
  form: FORM_KEY_ADDSHOES, // a unique identifier for this form
  destroyOnUnmount: false,
  touchOnBlur: false,
})(AAddStock);

export default AAddStock;
