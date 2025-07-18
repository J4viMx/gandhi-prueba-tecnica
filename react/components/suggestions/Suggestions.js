import React, { useEffect, useState } from "react";
import { useCssHandles } from "vtex.css-handles";
import "./index.css";
import Loader from "../Loader/Loader";
import NoResults from "../No-results/NoResults";

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
  const [formData, setFormData] = useState({
    Autor: "",
    Email: "",
    Libro: "",
    Estrellas: 5,
  });
  const [recommendationsPage, setRecommendationsPage] = useState(1);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "/api/dataentities/RC/search?_fields=Libro,Autor,Email,Estrellas,id&_sort=createdIn DESC"
      );
      const data = await response.json();
      setRecommendations(data);
    } catch (error) {
      console.error("Error fetching recommendations", error);
    } finally {
      setLoading(false);
    }
  };

  const recommendationsPerPage = 3;
  const totalRecommendationPages = Math.ceil(
    recommendations.length / recommendationsPerPage
  );

  const paginatedRecommendations = recommendations.slice(
    (recommendationsPage - 1) * recommendationsPerPage,
    recommendationsPage * recommendationsPerPage
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRecommendation = {
      ...formData,
    };
    setFormData({ Autor: "", Email: "", Libro: "", Estrellas: 5 });

    try {
      setLoading(true);
      const response = await fetch("/api/dataentities/RC/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRecommendation),
      });

      const result = await response.json();

      setRecommendations((prev) => [
        { id: result.Id, ...newRecommendation },
        ...prev,
      ]);
    } catch (error) {
      console.error("Error adding recommendation", error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
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

  useEffect(() => {
    fetchRecommendations();
  }, []);

  return (
    <section className={handles.section}>
      <h2>Recomendaciones</h2>
      <div className={handles.recommendationsContainer}>
        <div className={handles.formContainer}>
          <h3>Deja tu recomendación</h3>
          <form onSubmit={handleSubmit} className={handles.recommendationForm}>
            <div className={handles.formGroup}>
              <label htmlFor="Autor">Nombre:</label>
              <input
                type="text"
                id="Autor"
                value={formData.Autor}
                onChange={(e) =>
                  setFormData({ ...formData, Autor: e.target.value })
                }
                required
              />
            </div>

            <div className={handles.formGroup}>
              <label htmlFor="Email">Email:</label>
              <input
                type="email"
                id="Email"
                value={formData.Email}
                onChange={(e) =>
                  setFormData({ ...formData, Email: e.target.value })
                }
                required
              />
            </div>

            <div className={handles.formGroup}>
              <label htmlFor="Libro">Libro:</label>
              <input
                type="text"
                id="Libro"
                value={formData.Libro}
                onChange={(e) =>
                  setFormData({ ...formData, Libro: e.target.value })
                }
                required
              />
            </div>

            <div className={handles.formGroup}>
              <label htmlFor="Estrellas">Estrellas:</label>
              <select
                id="Estrellas"
                value={formData.Estrellas}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    Estrellas: Number(e.target.value),
                  })
                }
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} estrella{num > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              className={handles.submitBtn}
              disabled={loading}
            >
              Enviar Recomendación
            </button>
          </form>
        </div>

        <div className={handles.recommendationsList}>
          <h3>Recomendaciones recientes</h3>
          {recommendations?.length === 0 && !loading && <NoResults />}
          {loading ? (
            <Loader />
          ) : (
            paginatedRecommendations.map((rec) => (
              <div key={rec.id} className={handles.recommendationCard}>
                <div className={handles.recommendationHeader}>
                  <strong>{rec.Autor}</strong>
                  <div className={handles.stars}>
                    {renderStars(rec.Estrellas)}
                  </div>
                </div>
                <p className={handles.bookRecommended}>"{rec.Libro}"</p>
                <small className={handles.email}>{rec.Email}</small>
              </div>
            ))
          )}

          {!!recommendations.length && (
            <div className={handles.pagination}>
              <button
                onClick={() =>
                  setRecommendationsPage((prev) => Math.max(prev - 1, 1))
                }
                disabled={recommendationsPage === 1}
                className={handles.paginationBtn}
              >
                Anterior
              </button>
              <span className={handles.pageInfo}>
                Página {recommendationsPage} de {totalRecommendationPages}
              </span>
              <button
                onClick={() =>
                  setRecommendationsPage((prev) =>
                    Math.min(prev + 1, totalRecommendationPages)
                  )
                }
                disabled={recommendationsPage === totalRecommendationPages}
                className={handles.paginationBtn}
              >
                Siguiente
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Suggestions;
