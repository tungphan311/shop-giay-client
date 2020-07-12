import React from "react";
import { Box } from "Components/Admin/Svg/index";

export function getPathname(pathname) {
  let path = "/";
  for (let i = 1; i < pathname.length; i++) {
    if (pathname.charAt(i) === "/") {
      break;
    } else {
      path = `${path}${pathname.charAt(i)}`;
    }
  }

  return path;
}

export const OPTIONS = {
  rowsPerPageText: "Số dòng/ trang:",
  rangeSeparatorText: "trên",
  noRowsPerPage: false,
  selectAllRowsItem: false,
  selectAllRowsItemText: "Tất cả",
};

export const NoDataComponent = ({ title }) => (
  <div
    className="row no-gutters align-items-center justify-content-center"
    style={{ minHeight: "300px", minWidth: "960px" }}
  >
    <div className="col flex-column text-center">
      <Box />
      <div
        className="text-center"
        style={{
          fontSize: "20px",
          fontWeight: 700,
          color: "#0279c7",
          lineHeight: 1.3,
          marginBottom: "10px",
        }}
      >
        {`Không tìm thấy bất kì ${title} nào`}
      </div>
      <div className="text-center text-secondary">
        Hãy thay đổi bộ lọc hoặc điều kiện tìm kiếm
      </div>
    </div>
  </div>
);
