import React from "react";
import Pagination from "./Pagination";

const PageBottom = ({
  goToNextPage,
  goToPrevPage,
  pageArray,
  goToFirstPage,
  goToLastPage,
  goToPageNum,
  currentPage,
  numPages,
  totalRow,
  selectedRow,
}) => {
  return (
    <div className="bottom">
      <p>{`${selectedRow} of ${totalRow} row(s) selected`}</p>
      <Pagination
        goToNextPage={goToNextPage}
        goToPrevPage={goToPrevPage}
        pageArray={pageArray}
        goToFirstPage={goToFirstPage}
        goToLastPage={goToLastPage}
        goToPageNum={goToPageNum}
        numPages={numPages}
        currentPage={currentPage}
      />
    </div>
  );
};

export default PageBottom;
