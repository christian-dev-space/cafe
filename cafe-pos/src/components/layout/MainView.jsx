import PosView from "../order/PosView";
import HistoryView from "../history/HistoryView";
import ManageView from "../manage/ManageView";
import SalesView from "../sales/SalesView";
export default function MainView({
  view,

  // Order
  menu,
  activeCategory,
  setActiveCategory,
  addToCart,
  cart,
  changeQty,
  removeItem,
  clearCart,
  completeOrder,
  isCompleting,
  subtotal,
  tax,
  total,

  // Shared
  settings,

  // History
  orders,
  todayRevenue,
  todayCount,
  allRevenue,
  itemSales,
  exportToExcel,
  confirmClear,
  setConfirmClear,
  clearAllOrders,
  setReceipt,

  // Menu
  addCategory,
  deleteCategory,
  addItem,
  updateItem,
  deleteItem,
  persistSettings,
  confirmReset,
  setConfirmReset,
  resetEverything,
  storagePersistent,
}) {
  if (view === "order") {
    return (
      <PosView
        menu={menu}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        addToCart={addToCart}
        cart={cart}
        changeQty={changeQty}
        removeItem={removeItem}
        clearCart={clearCart}
        completeOrder={completeOrder}
        isCompleting={isCompleting}
        subtotal={subtotal}
        tax={tax}
        total={total}
        settings={settings}
      />
    );
  }

  if (view === "history") {
    return (
      <HistoryView
        orders={orders}
        settings={settings}
        todayRevenue={todayRevenue}
        todayCount={todayCount}
        allRevenue={allRevenue}
        exportToExcel={exportToExcel}
        confirmClear={confirmClear}
        setConfirmClear={setConfirmClear}
        clearAllOrders={clearAllOrders}
        onReprint={setReceipt}
      />
    );
  }

  if (view === "sales") {
  return (
    <SalesView
      itemSales={itemSales}
      settings={settings}
    />
  );
}

  return (
    <ManageView
      menu={menu}
      settings={settings}
      addCategory={addCategory}
      deleteCategory={deleteCategory}
      addItem={addItem}
      updateItem={updateItem}
      deleteItem={deleteItem}
      persistSettings={persistSettings}
      confirmReset={confirmReset}
      setConfirmReset={setConfirmReset}
      resetEverything={resetEverything}
      storagePersistent={storagePersistent}
    />
  );
}