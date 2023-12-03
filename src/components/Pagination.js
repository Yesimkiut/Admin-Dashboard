import React, { useMemo, useCallback } from "react";

const Pagination = ({
  goToNextPage,
  goToPrevPage,
  pageArray,
  goToFirstPage,
  goToLastPage,
  goToPageNum,
  currentPage,
  numPages,
}) => {
  const renderPageBlocks = useMemo(() => {
    return pageArray.map((pageNum) => (
      <a onClick={() => goToPageNum(pageNum)} key={pageNum} className="page">
        {pageNum}
      </a>
    ));
  }, [pageArray, goToPageNum]);

  const renderPrevPageBlocks = useCallback(() => {
    return (
      <>
        <a onClick={goToFirstPage} key="first-page" className="page">
          &#171;
        </a>
        <a onClick={goToPrevPage} key="prev-page" className="page">
          &#8592;
        </a>
      </>
    );
  }, [goToFirstPage, goToPrevPage]);

  const renderNextPageBlocks = useCallback(() => {
    return (
      <>
        <a onClick={goToNextPage} key="next-page" className="page">
          &rarr;
        </a>
        <a onClick={goToLastPage} key="last-page" className="page">
          &raquo;
        </a>
      </>
    );
  }, [goToNextPage, goToLastPage]);

  return useMemo(
    () => (
      <div className="pagination">
        <p>{`Page ${currentPage} of ${numPages}`}</p>
        <div className="pagination-button">
          {renderPrevPageBlocks()}
          {renderPageBlocks}
          {renderNextPageBlocks()}
        </div>
      </div>
    ),
    [
      currentPage,
      numPages,
      renderPrevPageBlocks,
      renderPageBlocks,
      renderNextPageBlocks,
    ]
  );
};

export default Pagination;
