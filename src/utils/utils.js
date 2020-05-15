import React from "react";

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

export const NO_DATA_COMPONENT = (
  <div
    style={{
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "rgba(0,0,0,0.87)",
      backgroundColor: "#FFFFFF",
      padding: "10px 0",
    }}
  >
    Không có sản phẩm nào
  </div>
);
