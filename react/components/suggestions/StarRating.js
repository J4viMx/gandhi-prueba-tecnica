import React from "react";

const StarRating = ({ rating, handles }) => {
  return Array.from({ length: 5 }, (_, i) => (
    <span
      key={i}
      className={
        i < rating ? `${handles.star} ${handles.filled}` : handles.star
      }
    >
      ★
    </span>
  ));
};

export default StarRating;
