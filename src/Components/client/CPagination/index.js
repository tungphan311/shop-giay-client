import React from "react";
import "./Pagination.scss";
import history from "state/history";
const CPagination = ({ total, per_page, current_page }) => {
  const pageNumber = [];
  for (let i = 1; i < Math.ceil(total / per_page); i++) {
    pageNumber.push(i);
  }
  const renderPageNumbers = pageNumber.map((number) => {
    let classes = current_page === number ? "active" : "";

    return (
      <span
        key={number}
        className={classes}
        onClick={() => number && history.push("/category/page/" + number)}
      >
        {number}
      </span>
    );
  });

  return <div className="pagination">{renderPageNumbers}</div>;
};

export default CPagination;
