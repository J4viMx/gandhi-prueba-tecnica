import React from "react";
import { useCssHandles } from "vtex.css-handles";
import { useProductsByCluster } from "./hooks/useProductsByCluster";
import { usePagination } from "../hooks/usePagination";
import { useAddToCart } from "./hooks/useAddToCart";
import "./index.css";
import Loader from "../Loader/Loader";
import NoResults from "../No-results/NoResults";

import Tabs from "./Tabs";
import BooksGrid from "./BooksGrid";
import PaginationControls from "./PaginationControls";

const CSS_HANDLES = [
  "container",
  "header",
  "tabs",
  "section",
  "pagination",
  "red",
  "tab",
  "active",
  "bookCard",
  "bookCover",
  "bookTitle",
  "paginationBtn",
  "pageInfo",
  "booksGrid",
  "bookPrice",
  "relative",
  "tag",
];

const buttonOptions = [
  { id: "138", label: "enero" },
  { id: "139", label: "febrero" },
  { id: "140", label: "marzo" },
];

const NewArrivals = () => {
  const { handles } = useCssHandles(CSS_HANDLES);
  const { activeTab, setActiveTab, products, loading } =
    useProductsByCluster("138");
  const { paginatedItems, currentPage, totalPages, nextPage, prevPage } =
    usePagination(products, 3);
  const { handleAddToCart, loadingAddCart } = useAddToCart();

  return (
    <div className={handles.container}>
      <header className={handles.header}>
        <h1>Librería Digital</h1>
      </header>

      <Tabs
        options={buttonOptions}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        handles={handles}
      />

      <section className={handles.section}>
        <h2>
          Novedades de {buttonOptions.find((tab) => tab.id === activeTab).label}
        </h2>

        {paginatedItems.length === 0 && !loading && <NoResults />}

        {loading ? (
          <Loader />
        ) : (
          <BooksGrid
            books={paginatedItems}
            activeTab={activeTab}
            handles={handles}
            onAddToCart={handleAddToCart}
            loadingAddCart={loadingAddCart}
          />
        )}

        {!!paginatedItems.length && (
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPrev={prevPage}
            onNext={nextPage}
            handles={handles}
          />
        )}
      </section>
    </div>
  );
};

export default NewArrivals;
