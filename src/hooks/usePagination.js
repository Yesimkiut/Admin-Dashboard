import { useState, useEffect, useMemo, useCallback } from "react";

export function usePagination(data) {
  const PAGE_LIMIT = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const numPages = useMemo(() => Math.ceil(data.length / PAGE_LIMIT), [data]);

  const getPageArray = useCallback(() => {
    const blocks = [];
    for (let i = 1; i <= numPages; i++) {
      blocks.push(i);
    }
    return blocks;
  }, [numPages]);

  const pageArray = useMemo(() => getPageArray(), [getPageArray]);

  const goToPrevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }, [currentPage]);

  const goToNextPage = useCallback(() => {
    if (currentPage < numPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }, [currentPage, numPages]);

  const goToFirstPage = useCallback(() => setCurrentPage(1), []);

  const goToLastPage = useCallback(() => setCurrentPage(numPages), [numPages]);

  const goToPageNum = useCallback((num) => setCurrentPage(num), []);

  return {
    goToNextPage,
    goToPrevPage,
    pageArray,
    currentPage,
    PAGE_LIMIT,
    goToFirstPage,
    goToLastPage,
    goToPageNum,
    numPages,
  };
}
