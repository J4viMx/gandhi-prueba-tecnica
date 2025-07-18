import React from "react";

const RecommendationForm = ({
  formData,
  handleChange,
  handleSubmit,
  loading,
  handles,
}) => (
  <div className={handles.formContainer}>
    <h3>Deja tu recomendación</h3>
    <form onSubmit={handleSubmit} className={handles.recommendationForm}>
      <div className={handles.formGroup}>
        <label htmlFor="Autor">Nombre:</label>
        <input
          type="text"
          id="Autor"
          value={formData.Autor}
          onChange={handleChange("Autor")}
          required
        />
      </div>

      <div className={handles.formGroup}>
        <label htmlFor="Email">Email:</label>
        <input
          type="email"
          id="Email"
          value={formData.Email}
          onChange={handleChange("Email")}
          required
        />
      </div>

      <div className={handles.formGroup}>
        <label htmlFor="Libro">Libro:</label>
        <input
          type="text"
          id="Libro"
          value={formData.Libro}
          onChange={handleChange("Libro")}
          required
        />
      </div>

      <div className={handles.formGroup}>
        <label htmlFor="Estrellas">Estrellas:</label>
        <select
          id="Estrellas"
          value={formData.Estrellas}
          onChange={handleChange("Estrellas")}
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num} estrella{num > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className={handles.submitBtn} disabled={loading}>
        Enviar Recomendación
      </button>
    </form>
  </div>
);

export default RecommendationForm;
