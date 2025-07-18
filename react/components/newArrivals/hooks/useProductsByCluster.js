import { useState, useEffect } from "react";

export const useProductsByCluster = (defaultClusterId) => {
  const [activeTab, setActiveTab] = useState(defaultClusterId);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/catalog_system/pub/products/search?fq=productClusterIds:${activeTab}`
        );
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching collection", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeTab]);

  return { activeTab, setActiveTab, products, loading };
};
