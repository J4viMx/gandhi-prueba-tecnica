import { useState, useMemo, useEffect } from "react";

export const usePagination = (items, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = useMemo(
    () => Math.ceil(items.length / itemsPerPage),
    [items, itemsPerPage]
  );

  // reset page when the item list changes
  useEffect(() => {
    setCurrentPage(1);
  }, [items]);

  const paginatedItems = useMemo(
    () =>
      items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [items, currentPage, itemsPerPage]
  );

  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return { currentPage, totalPages, paginatedItems, nextPage, prevPage };
};
