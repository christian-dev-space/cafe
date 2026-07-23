import { DEFAULT_MENU } from "../data/defaultMenu";
import { DEFAULT_SETTINGS } from "../data/defaultSettings";

export default function useAppReset(
  persistMenu,
  persistOrders,
  persistSettings,
  clearCart,
  setActiveCategory,
  setConfirmReset,
  showToast
) {
  const resetEverything = async () => {
    await persistMenu(DEFAULT_MENU);
    await persistOrders([]);
    await persistSettings(DEFAULT_SETTINGS);

    clearCart();
    setActiveCategory(Object.keys(DEFAULT_MENU)[0]);
    setConfirmReset(false);

    showToast("Reset to defaults");
  };

  return {
    resetEverything,
  };
}