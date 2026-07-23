import useOrders from "./useOrders";

export default function useCafeOrders(
  orders,
  setOrders,
  settings,
  showToast,
  setConfirmClear
) {
  const orderActions = useOrders(
    orders,
    setOrders,
    settings,
    showToast,
    setConfirmClear
  );

  return {
    ...orderActions,
  };
}