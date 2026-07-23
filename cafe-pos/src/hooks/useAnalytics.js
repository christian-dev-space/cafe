import { isSameDay } from "../utils/helpers";

export default function useAnalytics(orders) {
  const todayOrders = orders.filter((o) =>
    isSameDay(o.timestamp, Date.now())
  );

  const todayRevenue = todayOrders.reduce(
    (sum, order) => sum + order.total,
    0
  );

  const allRevenue = orders.reduce(
    (sum, order) => sum + order.total,
    0
  );

  return {
    todayOrders,
    todayRevenue,
    allRevenue,
  };
}