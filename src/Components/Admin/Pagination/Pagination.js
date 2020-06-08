import React from "react";
import Pagination from "react-js-pagination";
import "./Pagination.scss";

function APagination({ page, handlePageChange, perPage, totalRows }) {
  return (
    <div className="pagination-admin">
      <Pagination
        activePage={page}
        itemsCountPerPage={perPage}
        totalItemsCount={totalRows}
        pageRangeDisplayed={5}
        onChange={handlePageChange}
        innerClass="pagination-bar"
        itemClass="itemClass"
        itemClassFirst="itemClass"
      />
    </div>
  );
}

export default APagination;
