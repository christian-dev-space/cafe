import { useState } from "react";
import { isSameDay } from "../utils/helpers";

export default function useCart(
  orders,
  persistOrders,
  settings,
  showToast,
  setReceipt
) {
  const [cart, setCart] = useState([]);
  const [isCompleting, setIsCompleting] = useState(false);

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);

      if (existing) {
        return prev.map((c) =>
          c.id === item.id
            ? { ...c, qty: c.qty + 1 }
            : c
        );
      }

      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          qty: 1,
        },
      ];
    });

    showToast(`Added ${item.name}`);
  };

  const changeQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((c) =>
          c.id === id
            ? { ...c, qty: c.qty + delta }
            : c
        )
        .filter((c) => c.qty > 0)
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotal = cart.reduce(
    (sum, c) => sum + c.price * c.qty,
    0
  );

  const tax =
    subtotal * ((Number(settings.taxRate) || 0) / 100);

  const total = subtotal + tax;

  const completeOrder = async () => {
    if (cart.length === 0 || isCompleting) return;

    setIsCompleting(true);

    try {
      const now = Date.now();

      const order = {
        id: now,
        timestamp: now,
        dailyNumber:
          orders.filter((o) =>
            isSameDay(o.timestamp, now)
          ).length + 1,
        items: cart.map((c) => ({
          name: c.name,
          price: c.price,
          qty: c.qty,
        })),
        subtotal,
        tax,
        taxRate: Number(settings.taxRate) || 0,
        total,
      };

      const saved = await persistOrders([
        ...orders,
        order,
      ]);

      clearCart();

      setReceipt(order);

      if (saved) {
        showToast("Order completed");
      }
    } finally {
      setIsCompleting(false);
    }
  };

  return {
    cart,
    subtotal,
    tax,
    total,
    isCompleting,
    addToCart,
    changeQty,
    removeItem,
    clearCart,
    completeOrder,
  };
}