import React, { useState } from "react";
import "./FilterBar.scss";
import { FilterIcon, SearchIcon, CloseIcon } from "Components/Admin/Svg/index";
import OutsideClickWrapper from "Components/Admin/OutsideClickWrapper/OutsideClickWrapper";
import AProductSelect from "Components/Admin/ProductSelect/Select";
import ExportFileModal from "Components/Admin/Modal/ExportFile";

const SELECT = "select";
const VALUE = "value";

const DEFAULT_SELECTED = {
  value: { type: SELECT, name: "styleId" },
  label: "Loại sản phẩm",
};

const COMPARES = [
  { value: "min", label: "lớn hơn hoặc bằng" },
  { value: "equal", label: "bằng" },
  { value: "max", label: "nhỏ hơn hoặc bằng" },
];

function AFilterBar({ onExport, options, filters, handleAddFilter }) {
  const [dropdown, setDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(DEFAULT_SELECTED);

  const [select, setSelect] = useState(null);
  const [number, setNumber] = useState(null);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const btnClassNames = `dropdown ui-popover-arrow-right ui-popover-placement-right ${
    dropdown === "btn" ? "ui-popover__container--contains-active-popover" : ""
  }`;

  const handleFilterDropdown = () => setDropdown(!dropdown);

  const handleExport = (source, type) => {
    onExport(source, type);
  };

  const handleSelectOptions = (selected) => {
    setSelected(selected);
    setSelect(null);
    setNumber(null);
  };

  const handleSelect = (selected) => {
    setSelect(selected);
  };

  return (
    <div className="row no-gutters mt-4">
      <div className="col">
        <div>
          <div className="row no-gutters" style={{ position: "relative" }}>
            <div className="col-auto pr-3">
              <OutsideClickWrapper
                onClickOutside={() => setDropdown("")}
                isShowing={dropdown}
              >
                <div
                  className="filter__dropdown"
                  onClick={() => handleFilterDropdown()}
                >
                  <FilterIcon />
                  <span className="ml-3 d-none d-sm-inline-block">
                    Thêm điều kiện lọc
                  </span>
                </div>
                <div
                  style={{
                    position: "absolute",
                    zIndex: "1000",
                    top: "48px",
                  }}
                  className={dropdown ? "filter--show" : "d-none"}
                >
                  <div>
                    <div className="filter__popover">
                      <div className="filter__popover--content">
                        <div className="filter__popover--inner">
                          <div
                            style={{ color: "#212121", position: "relative" }}
                          >
                            <div className="p-4">
                              <div className="mb-2">
                                Hiển thị tất cả khách hàng theo:
                              </div>
                              <AProductSelect
                                selectedOption={selected}
                                options={options}
                                onChange={(selected) =>
                                  handleSelectOptions(selected)
                                }
                              />
                              <div
                                className="mb-2"
                                style={{ marginTop: "10px" }}
                              >
                                là
                              </div>
                              {selected.value.type === SELECT ? (
                                <AProductSelect
                                  selectedOption={select}
                                  options={filters[selected.value.name]}
                                  onChange={(selected) =>
                                    handleSelect(selected)
                                  }
                                />
                              ) : (
                                <div>
                                  <AProductSelect
                                    selectedOption={select}
                                    options={COMPARES}
                                    onChange={(selected) =>
                                      handleSelect(selected)
                                    }
                                  />
                                  <input
                                    className="filter--number"
                                    type="number"
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                  />
                                </div>
                              )}
                              <div className="group-filter-btn d-flex">
                                <div className="group-filter-btn--cancel mr-2">
                                  <button className="btn btn-border btn-primary mt-3">
                                    Huỷ
                                  </button>
                                </div>
                                <div className="group-filter-btn--add d-flex flex-grow-1 justify-content-end">
                                  <button
                                    className="btn btn-primary mt-3"
                                    onClick={() =>
                                      handleAddFilter(
                                        selected,
                                        select.value,
                                        number
                                      )
                                    }
                                  >
                                    Thêm điều kiện lọc
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </OutsideClickWrapper>
            </div>
            <div className="col">
              <div className="filter__input">
                <div className="filter__input--icon">
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  className="next-input next-input--invisible"
                  placeholder="Tìm kiếm ..."
                />
                <div className="next-input-add-on next-input__add-on--after">
                  <CloseIcon />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-auto pl-0">
        <button className="btn btn-primary ml-3">
          <SearchIcon />
          <span className="ml-3 d-none d-sm-inline-block">Tìm kiếm</span>
        </button>
        <div className="ml-3 d-inline-block">
          <div className={btnClassNames}>
            <div>
              <button
                className="btn btn-bg cursor-pointer"
                onClick={handleOpenModal}
              >
                <i className="fas fa-file-export" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <ExportFileModal
        show={showModal}
        handleClose={handleCloseModal}
        title="Xuất sản phẩm"
        handleExport={handleExport}
      />
    </div>
  );
}

export default AFilterBar;
