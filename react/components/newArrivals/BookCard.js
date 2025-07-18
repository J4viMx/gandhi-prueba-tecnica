import React from "react";

const BookCard = ({
  book,
  activeTab,
  handles,
  onAddToCart,
  loadingAddCart,
}) => (
  <div className={`${handles.bookCard} ${handles.relative}`}>
    <div className={handles.tag}>{book?.productClusters?.[activeTab]}</div>
    <img
      src={book.items?.[0].images?.[0].imageUrl || "/placeholder.svg"}
      alt={book.productName}
      className={handles.bookCover}
    />
    <h3 className={handles.bookTitle}>{book.productName}</h3>
    <p className={handles.bookPrice}>
      ${book.items?.[0].sellers?.[0].commertialOffer?.Price}
    </p>
    <button
      className={handles.paginationBtn}
      onClick={() => onAddToCart(book)}
      disabled={loadingAddCart}
    >
      Agregar al carrito
    </button>
  </div>
);

export default BookCard;
