import { useState } from "react";
import ReceiptModal from "./components/ReceiptModal";   
// import HistoryView from "./components/history/HistoryView";
// import ManageView from "./components/manage/ManageView";
// import PosView from "./components/order/PosView";
import MainView from "./components/layout/MainView";
import Header from "./components/layout/Header";
import Toast from "./components/layout/Toast";
import LoadingScreen from "./components/layout/LoadingScreen";
import { DEFAULT_MENU } from "./data/defaultMenu";
import { DEFAULT_SETTINGS } from "./data/defaultSettings";
// import { STORAGE_KEYS } from "./data/storageKeys";
import useUiState from "./hooks/useUiState";
import useCafeOrders from "./hooks/useCafeOrders";
import useCafeMenu from "./hooks/useCafeMenu";
import useCart from "./hooks/useCart";
import useToast from "./hooks/useToast";
import useStorage from "./hooks/useStorage";
import useAnalytics from "./hooks/useAnalytics";
import useSettings from "./hooks/useSettings";
import useActiveCategory from "./hooks/useActiveCategory";
import useSalesReport from "./hooks/useSalesReport";
import useAppReset from "./hooks/useAppReset";
import "./styles/cafe-pos.css";

export default function CafePOS() {
  const [menu, setMenu] = useState(DEFAULT_MENU);
  const [orders, setOrders] = useState([]);
  // const [view, setView] = useState('order');
  const [activeCategory, setActiveCategory] = useState(null);
  // const [confirmClear, setConfirmClear] = useState(false);
  // const [confirmReset, setConfirmReset] = useState(false);
  // const [receipt, setReceipt] = useState(null);
  const {
    view,
    setView,

    confirmClear,
    setConfirmClear,

    confirmReset,
    setConfirmReset,

    receipt,
    setReceipt,
  } = useUiState();
  const {
    toast,
    showToast,
  } = useToast();

  const {
    settings,
    setSettings,
    persistSettings,
  } = useSettings(showToast);

  const {
    loading,
    storagePersistent,
  } = useStorage(
    setMenu,
    setOrders,
    setSettings
  );

  const {
    persistMenu,
    addCategory,
    deleteCategory,
    addItem,
    updateItem,
    deleteItem,
  } = useCafeMenu(
    menu,
    setMenu,
    activeCategory,
    setActiveCategory,
    showToast
  );
  const {
    persistOrders,
    exportToExcel,
    clearAllOrders,
  } = useCafeOrders(
    orders,
    setOrders,
    settings,
    showToast,
    setConfirmClear
  );

  const {
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
  } = useCart(
    orders,
    persistOrders,
    settings,
    showToast,
    setReceipt
  );

  useActiveCategory(
    menu,
    activeCategory,
    setActiveCategory
  );

  const { resetEverything } = useAppReset(
    persistMenu,
    persistOrders,
    persistSettings,
    clearCart,
    setActiveCategory,
    setConfirmReset,
    showToast
  );

  const {
  todayOrders,
  todayRevenue,
  allRevenue,
} = useAnalytics(orders);
const {
  itemSales,
} = useSalesReport(orders);

if (loading) {
  return <LoadingScreen />;
}



  return (
    <div className="w-full cafe-pos-root">
      

      <div className="cafe-pos relative">
        <Header
          settings={settings}
          view={view}
          setView={setView}
          cart={cart}
        />

        <div className="p-4 sm:p-6">
          <MainView
              view={view}

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

              orders={orders}
              todayRevenue={todayRevenue}
              todayCount={todayOrders.length}
              allRevenue={allRevenue}
              itemSales={itemSales}
              exportToExcel={exportToExcel}
              confirmClear={confirmClear}
              setConfirmClear={setConfirmClear}
              clearAllOrders={clearAllOrders}
              setReceipt={setReceipt}

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
        </div>

        <Toast toast={toast} />
      </div>

      {receipt && (
        <ReceiptModal
          order={receipt}
          settings={settings}
          onClose={() => setReceipt(null)}
        />
      )}
    </div>
  );
}

