import React, { useEffect, useState } from "react";

import { useCssHandles } from "vtex.css-handles";
import { useOrderItems } from "vtex.order-items/OrderItems";
import Card from "./Card";
import "./index.css";
import Loader from "../Loader/Loader";
import NoResults from "../No-results/NoResults";

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
  {
    id: "138",
    label: "enero",
  },
  {
    id: "139",
    label: "febrero",
  },
  {
    id: "140",
    label: "marzo",
  },
];

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("138");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingAddCart, setLoadingAddCart] = useState(false);

  const { addItem } = useOrderItems();

  const { handles } = useCssHandles(CSS_HANDLES);
  const booksPerPage = 3;

  const currentBooks = products;
  const totalPages = Math.ceil(currentBooks.length / booksPerPage);

  const paginatedBooks = currentBooks.slice(
    (currentPage - 1) * booksPerPage,
    currentPage * booksPerPage
  );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleAddToCart = (product) => {
    setLoadingAddCart(true);
    if (!product.items || product.items.length === 0) {
      return;
    }

    const sku = product.items[0];
    const seller = sku.sellers && sku.sellers[0];

    if (!seller || !sku.itemId) {
      return;
    }

    addItem([
      {
        id: sku.itemId,
        quantity: 1,
        seller: seller.sellerId,
      },
    ])
      .then(() => {
        console.log("Producto agregado al carrito correctamente");
      })
      .catch((err) => {
        console.error("Error al agregar al carrito:", err);
      })
      .finally(() => {
        setLoadingAddCart(false);
      });
  };

  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/catalog_system/pub/products/search?fq=productClusterIds:${activeTab}`
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching collection", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [activeTab]);

  return (
    <div className={handles.container}>
      <header className={`${handles.header}`}>
        <h1>Librería Digital</h1>
      </header>

      {/* Tabs */}
      <div className={handles.tabs}>
        {buttonOptions.map((tab) => (
          <button
            key={tab.id}
            className={`${handles.tab} ${
              activeTab === tab.id ? handles.active : ""
            }`}
            onClick={() => handleTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Novedades Section */}
      <section className={handles.section}>
        <h2>
          Novedades de {buttonOptions.find((tab) => tab.id === activeTab).label}
        </h2>
        {paginatedBooks?.length === 0 && <NoResults />}
        {loading ? (
          <Loader />
        ) : (
          <div className={handles.booksGrid}>
            {paginatedBooks.map((book) => (
              <div
                key={book.id}
                className={`${handles.bookCard} ${handles.relative}`}
              >
                <div className={handles.tag}>
                  {book?.productClusters?.[activeTab]}
                </div>
                <img
                  src={
                    book.items?.[0].images?.[0].imageUrl || "/placeholder.svg"
                  }
                  alt={book.productName}
                  className={handles.bookCover}
                />
                <h3 className={handles.bookTitle}>{book.productName}</h3>
                <p className={handles.bookPrice}>
                  ${book.items?.[0].sellers?.[0].commertialOffer?.Price}
                </p>
                <button
                  className={handles.paginationBtn}
                  onClick={() => handleAddToCart(book)}
                  disabled={loadingAddCart}
                >
                  Agregar al carrito
                </button>
              </div>
            ))}
          </div>
        )}

        {!!paginatedBooks.length && (
          <div className={handles.pagination}>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={handles.paginationBtn}
            >
              Anterior
            </button>
            <span className={handles.pageInfo}>
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={handles.paginationBtn}
            >
              Siguiente
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

export default NewArrivals;
