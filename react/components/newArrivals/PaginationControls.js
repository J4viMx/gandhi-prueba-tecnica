import React from "react";

const PaginationControls = ({
  currentPage,
  totalPages,
  onPrev,
  onNext,
  handles,
}) => (
  <div className={handles.pagination}>
    <button
      onClick={onPrev}
      disabled={currentPage === 1}
      className={handles.paginationBtn}
    >
      Anterior
    </button>
    <span className={handles.pageInfo}>
      Página {currentPage} de {totalPages}
    </span>
    <button
      onClick={onNext}
      disabled={currentPage === totalPages}
      className={handles.paginationBtn}
    >
      Siguiente
    </button>
  </div>
);

export default PaginationControls;
