import { useState } from "react";

export const useRecommendationForm = (onSubmit) => {
  const [formData, setFormData] = useState({
    Autor: "",
    Email: "",
    Libro: "",
    Estrellas: 5,
  });

  const handleChange = (field) => (e) => {
    const value =
      field === "Estrellas" ? Number(e.target.value) : e.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
    setFormData({ Autor: "", Email: "", Libro: "", Estrellas: 5 });
  };

  return { formData, handleChange, handleSubmit };
};
