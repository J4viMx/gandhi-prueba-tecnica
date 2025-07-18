import { useState } from "react";
import { useOrderItems } from "vtex.order-items/OrderItems";

export const useAddToCart = () => {
  const { addItem } = useOrderItems();
  const [loadingAddCart, setLoadingAddCart] = useState(false);

  const handleAddToCart = async (product) => {
    setLoadingAddCart(true);

    if (!product.items || product.items.length === 0) {
      setLoadingAddCart(false);
      return;
    }

    const sku = product.items[0];
    const seller = sku.sellers && sku.sellers[0];

    if (!seller || !sku.itemId) {
      setLoadingAddCart(false);
      return;
    }

    try {
      await addItem([
        {
          id: sku.itemId,
          quantity: 1,
          seller: seller.sellerId,
        },
      ]);
      console.log("Producto agregado al carrito correctamente");
    } catch (err) {
      console.error("Error al agregar al carrito:", err);
    } finally {
      setLoadingAddCart(false);
    }
  };

  return { handleAddToCart, loadingAddCart };
};
