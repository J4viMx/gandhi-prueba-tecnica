import React from "react";
import BookCard from "./BookCard";

const BooksGrid = ({
  books,
  activeTab,
  handles,
  onAddToCart,
  loadingAddCart,
}) => (
  <div className={handles.booksGrid}>
    {books.map((book) => (
      <BookCard
        key={book.id}
        book={book}
        activeTab={activeTab}
        handles={handles}
        onAddToCart={onAddToCart}
        loadingAddCart={loadingAddCart}
      />
    ))}
  </div>
);

export default BooksGrid;
