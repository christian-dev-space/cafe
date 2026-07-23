import { useState } from "react";
import { DEFAULT_SETTINGS } from "../data/defaultSettings";
import { STORAGE_KEYS } from "../data/storageKeys";
import dataStore from "../services/storage";

export default function useSettings(showToast) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  const persistSettings = async (next) => {
    setSettings(next);

    try {
      await dataStore.save(STORAGE_KEYS.settings, next);
      return true;
    } catch {
      showToast("Couldn't save settings", "rust");
      return false;
    }
  };

  return {
    settings,
    setSettings,
    persistSettings,
  };
}