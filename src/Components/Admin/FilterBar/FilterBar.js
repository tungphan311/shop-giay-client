import React, { useState } from "react";
import "./FilterBar.scss";
import {
  FilterIcon,
  SearchIcon,
  CloseIcon,
} from "Components/Admin/Svg/index";
import OutsideClickWrapper from "Components/Admin/OutsideClickWrapper/OutsideClickWrapper";
import AProductSelect from "Components/Admin/ProductSelect/Select";
import ExportFileModal from "Components/Admin/Modal/ExportFile";

function AFilterBar({ onExport }) {
  const [dropdown, setDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const btnClassNames = `dropdown ui-popover-arrow-right ui-popover-placement-right ${
    dropdown === "btn" ? "ui-popover__container--contains-active-popover" : ""
  }`;

  const handleFilterDropdown = () => setDropdown(!dropdown);

  const handleExport = (source, type) => {
    onExport(source, type);
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
                  style={{ position: "absolute", zIndex: "1000", top: "48px" }}
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
                                selectedOption={{}}
                                options={[]}
                              />
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
            <div className="col-auto pl-3 d-flex">
              <button className="btn btn-info">Áp dụng</button>
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
