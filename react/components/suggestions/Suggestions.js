/* import React from "react";

const Suggestions = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    book: "",
    stars: 5,
  });
  const [recommendationsPage, setRecommendationsPage] = useState(1);
  const [recommendations, setRecommendations] = useState([
    {
      id: 1,
      name: "María García",
      email: "maria@email.com",
      book: "El Nombre del Viento",
      stars: 5,
    },
    {
      id: 2,
      name: "Juan Pérez",
      email: "juan@email.com",
      book: "1984",
      stars: 4,
    },
    {
      id: 3,
      name: "Ana López",
      email: "ana@email.com",
      book: "Cien Años de Soledad",
      stars: 5,
    },
    {
      id: 4,
      name: "Carlos Ruiz",
      email: "carlos@email.com",
      book: "El Principito",
      stars: 4,
    },
    {
      id: 5,
      name: "Laura Martín",
      email: "laura@email.com",
      book: "Harry Potter",
      stars: 5,
    },
  ]);

  const recommendationsPerPage = 3;
  const totalRecommendationPages = Math.ceil(
    recommendations.length / recommendationsPerPage
  );

  const paginatedRecommendations = recommendations.slice(
    (recommendationsPage - 1) * recommendationsPerPage,
    recommendationsPage * recommendationsPerPage
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecommendation = {
      id: recommendations.length + 1,
      ...formData,
    };
    setRecommendations([newRecommendation, ...recommendations]);
    setFormData({ name: "", email: "", book: "", stars: 5 });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? "star filled" : "star"}>
        ★
      </span>
    ));
  };

  return (
    <section className="section">
      <h2>Recomendaciones</h2>
      <div className="recommendations-container">
        <div className="form-container">
          <h3>Deja tu recomendación</h3>
          <form onSubmit={handleSubmit} className="recommendation-form">
            <div className="form-group">
              <label htmlFor="name">Nombre:</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="book">Libro:</label>
              <input
                type="text"
                id="book"
                value={formData.book}
                onChange={(e) =>
                  setFormData({ ...formData, book: e.target.value })
                }
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="stars">Estrellas:</label>
              <select
                id="stars"
                value={formData.stars}
                onChange={(e) =>
                  setFormData({ ...formData, stars: Number(e.target.value) })
                }
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} estrella{num > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>

            <button type="submit" className="submit-btn">
              Enviar Recomendación
            </button>
          </form>
        </div>

        <div className="recommendations-list">
          <h3>Recomendaciones recientes</h3>
          {paginatedRecommendations.map((rec) => (
            <div key={rec.id} className="recommendation-card">
              <div className="recommendation-header">
                <strong>{rec.name}</strong>
                <div className="stars">{renderStars(rec.stars)}</div>
              </div>
              <p className="book-recommended">"{rec.book}"</p>
              <small className="email">{rec.email}</small>
            </div>
          ))}

          <div className="pagination">
            <button
              onClick={() =>
                setRecommendationsPage((prev) => Math.max(prev - 1, 1))
              }
              disabled={recommendationsPage === 1}
              className="pagination-btn"
            >
              Anterior
            </button>
            <span className="page-info">
              Página {recommendationsPage} de {totalRecommendationPages}
            </span>
            <button
              onClick={() =>
                setRecommendationsPage((prev) =>
                  Math.min(prev + 1, totalRecommendationPages)
                )
              }
              disabled={recommendationsPage === totalRecommendationPages}
              className="pagination-btn"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Suggestions; */
