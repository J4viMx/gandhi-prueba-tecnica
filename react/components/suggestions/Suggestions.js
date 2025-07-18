import React from "react";
import { useCssHandles } from "vtex.css-handles";
import "./index.css";

import { useRecommendations } from "./hooks/useRecommendations";
import { useRecommendationForm } from "./hooks/useRecommendationForm";
import { usePagination } from "../hooks/usePagination";

import RecommendationForm from "./RecommendationForm";
import RecommendationList from "./RecommendationList";

const CSS_HANDLES = [
  "section",
  "recommendationsContainer",
  "formContainer",
  "recommendationForm",
  "formGroup",
  "submitBtn",
  "recommendationsList",
  "recommendationCard",
  "recommendationHeader",
  "stars",
  "bookRecommended",
  "email",
  "pagination",
  "paginationBtn",
  "pageInfo",
  "filled",
  "star",
];

const Suggestions = () => {
  const { handles } = useCssHandles(CSS_HANDLES);
  const { recommendations, loading, addRecommendation } = useRecommendations();
  const { formData, handleChange, handleSubmit } =
    useRecommendationForm(addRecommendation);

  const {
    paginatedItems: paginatedRecommendations,
    currentPage: recommendationsPage,
    totalPages: totalRecommendationPages,
    nextPage,
    prevPage,
  } = usePagination(recommendations, 3);

  return (
    <section className={handles.section}>
      <h2>Recomendaciones</h2>
      <div className={handles.recommendationsContainer}>
        <RecommendationForm
          formData={formData}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          loading={loading}
          handles={handles}
        />

        <RecommendationList
          recommendations={recommendations}
          paginatedRecommendations={paginatedRecommendations}
          loading={loading}
          currentPage={recommendationsPage}
          totalPages={totalRecommendationPages}
          nextPage={nextPage}
          prevPage={prevPage}
          handles={handles}
        />
      </div>
    </section>
  );
};

export default Suggestions;
