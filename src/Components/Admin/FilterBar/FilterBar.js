import React, { useState } from "react";
import "./FilterBar.scss";
import { FilterIcon, SearchIcon, AddIcon } from "Components/Admin/Svg/index";
import OutsideClickWrapper from "Components/Admin/OutsideClickWrapper/OutsideClickWrapper";

function AFilterBar() {
  const [dropdown, setDropdown] = useState("");

  const btnClassNames = `dropdown ui-popover-arrow-right ui-popover-placement-right ${
    dropdown === "btn" ? "ui-popover__container--contains-active-popover" : ""
  }`;

  const handleBtnDropdown = () => {
    if (dropdown !== "btn") {
      setDropdown("btn");
    } else {
      setDropdown("");
    }
  };

  return (
    <div className="row no-gutters">
      <div className="col">
        <div>
          <div className="row no-gutters">
            <div className="col-auto pr-3">
              <div className="filter__dropdown">
                <FilterIcon />
                <span className="ml-3 d-none d-sm-inline-block">
                  Thêm điều kiện lọc
                </span>
              </div>
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
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-auto pl-0">
        <button className="btn btn-primary ml-3">
          <AddIcon />
          <span className="ml-3 d-none d-sm-inline-block">Tạo sản phẩm</span>
        </button>
        <OutsideClickWrapper
          onClickOutside={() => setDropdown("")}
          isShowing={dropdown === "btn"}
          className="ml-3 d-inline-block"
        >
          <div className={btnClassNames}>
            <div>
              <button
                className="btn btn-bg cursor-pointer"
                onClick={handleBtnDropdown}
              >
                <i
                  className={
                    dropdown === "btn" ? "flaticon-cross" : "icon-options"
                  }
                />
              </button>
            </div>
            <div
              className={`ui-popover ${
                dropdown === "btn" ? "ui-popover--is-active" : ""
              }`}
            >
              <div className="ui-popover__tooltip"></div>
              <div className="ui-popover__content-wrapper">
                <div className="ui-popover__content" style={{ width: "160px" }}>
                  <div className="ui-popover__pane">
                    <p className="ellipsis-item ">Xuất file csv</p>
                    <p className="ellipsis-item ">Xuất file excel</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </OutsideClickWrapper>
      </div>
    </div>
  );
}

export default AFilterBar;
