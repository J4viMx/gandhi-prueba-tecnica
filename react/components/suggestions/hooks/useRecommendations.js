import { useState, useEffect } from "react";

export const useRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

    fetchRecommendations();
  }, []);

  const addRecommendation = async (newRec) => {
    try {
      setLoading(true);
      const response = await fetch("/api/dataentities/RC/documents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRec),
      });
      const result = await response.json();
      setRecommendations((prev) => [{ id: result.Id, ...newRec }, ...prev]);
    } catch (error) {
      console.error("Error adding recommendation", error);
    } finally {
      setLoading(false);
    }
  };

  return { recommendations, loading, addRecommendation };
};
