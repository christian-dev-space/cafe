import dataStore from "../services/storage";
import { STORAGE_KEYS } from "../data/storageKeys";

export default function useMenuStorage(setMenu, showToast) {
  const persistMenu = async (next) => {
    setMenu(next);

    try {
      await dataStore.save(STORAGE_KEYS.menu, next);
      return true;
    } catch (e) {
      showToast("Couldn't save menu changes", "rust");
      return false;
    }
  };

  return {
    persistMenu,
  };
}