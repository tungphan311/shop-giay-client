import React from "react";
import "./Pagination.scss";
import history from "state/history";
const CPagination = ({ category, total, per_page, current_page }) => {
  const pageNumber = [];
  for (let i = 1; i <= Math.ceil(total / per_page); i++) {
    pageNumber.push(i);
  }
  let renderPageNumbers = 0;
  let href_path = "";
  if (category !== "Danh sách sản phẩm") {
    href_path = "/category/" + category + /page/;
  } else {
    href_path = "/category/page/";
  }

  if (pageNumber.length > 1) {
    renderPageNumbers = pageNumber.map((number) => {
      let classes = parseInt(current_page) === number ? "active" : "";

      return (
        <span
          key={number}
          className={classes}
          onClick={() =>
            // number && history.push("/category/" + category + /page/ + number)
            number && history.push(href_path + number)
          }
        >
          {number}
        </span>
      );
    });
  }

  return <div className="pagination">{renderPageNumbers}</div>;
};

export default CPagination;
