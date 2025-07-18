import React from "react";
import Loader from "../Loader/Loader";
import NoResults from "../No-results/NoResults";
import RecommendationCard from "./RecommendationCard";
import StarRating from "./StarRating";

const RecommendationList = ({
  recommendations,
  paginatedRecommendations,
  loading,
  currentPage,
  totalPages,
  nextPage,
  prevPage,
  handles,
}) => (
  <div className={handles.recommendationsList}>
    <h3>Recomendaciones recientes</h3>
    {recommendations.length === 0 && !loading && <NoResults />}
    {loading ? (
      <Loader />
    ) : (
      paginatedRecommendations.map((rec) => (
        <RecommendationCard
          key={rec.id}
          rec={rec}
          handles={handles}
          StarRating={StarRating}
        />
      ))
    )}

    {!!recommendations.length && (
      <div className={handles.pagination}>
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={handles.paginationBtn}
        >
          Anterior
        </button>
        <span className={handles.pageInfo}>
          Página {currentPage} de {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={handles.paginationBtn}
        >
          Siguiente
        </button>
      </div>
    )}
  </div>
);

export default RecommendationList;
