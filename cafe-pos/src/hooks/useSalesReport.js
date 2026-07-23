import { useMemo } from "react";

export default function useSalesReport(orders) {
  const itemSales = useMemo(() => {
    const items = {};

    orders.forEach(order => {
      order.items.forEach(item => {
        if (!items[item.name]) {
          items[item.name] = {
            name: item.name,
            quantity: 0,
            revenue: 0,
          };
        }

        items[item.name].quantity += item.qty;
        items[item.name].revenue += item.qty * item.price;
      });
    });

    return Object.values(items).sort(
      (a, b) => b.quantity - a.quantity
    );
  }, [orders]);

  return {
    itemSales,
  };
}