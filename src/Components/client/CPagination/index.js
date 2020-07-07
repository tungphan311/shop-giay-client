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

  let nextPage = 0;
  let prevPage = 0;
  let showPrevButton = false;
  let showNextButton = false;

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

    if (current_page < pageNumber.length) {
      showNextButton = true;
      nextPage = parseInt(current_page) + 1;
    }
    if (current_page > 1) {
      showPrevButton = true;
      prevPage = parseInt(current_page) + 1;
    }
  }

  return (
    <div className="pagination">
      <span
        style={{ display: { showPrevButton } ? "block" : "none" }}
        key={0}
        onClick={() =>
          // number && history.push("/category/" + category + /page/ + number)
          history.push(href_path + prevPage)
        }
      >
        &laquo;
      </span>
      {renderPageNumbers}
      <span
        style={{ display: { showNextButton } ? "block" : "none" }}
        key={pageNumber.length + 1}
        onClick={() =>
          // number && history.push("/category/" + category + /page/ + number)
          history.push(href_path + nextPage)
        }
      >
        &raquo;
      </span>
    </div>
  );
};

export default CPagination;
