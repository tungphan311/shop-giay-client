import React from "react";
import Pagination from "react-js-pagination";
import "./Pagination.scss";

function APagination({
  page,
  handlePageChange,
  perPage,
  totalRows,
  pageSizes,
  handlePerPageChange,
}) {
  const start = (page - 1) * perPage + 1;
  const end = page * perPage;
  return (
    <div className="pagination-admin mr-4">
      <span>Số dòng/ trang: </span>
      <select
        className="ml-2 mr-2 pagination__page-size"
        value={perPage}
        onChange={handlePerPageChange}
      >
        {pageSizes.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
      <span className="mr-2">{`${start} - ${
        end > totalRows ? totalRows : end
      } trên ${totalRows}`}</span>
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
