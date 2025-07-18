import React from "react";

const RecommendationCard = ({ rec, handles, StarRating }) => (
  <div key={rec.id} className={handles.recommendationCard}>
    <div className={handles.recommendationHeader}>
      <strong>{rec.Autor}</strong>
      <div className={handles.stars}>
        <StarRating rating={rec.Estrellas} handles={handles} />
      </div>
    </div>
    <p className={handles.bookRecommended}>"{rec.Libro}"</p>
    <small className={handles.email}>{rec.Email}</small>
  </div>
);

export default RecommendationCard;
