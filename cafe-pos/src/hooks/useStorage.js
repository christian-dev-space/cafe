import { useState, useEffect } from "react";
import { STORAGE_KEYS } from "../data/storageKeys";
import dataStore from "../services/storage";

export default function useStorage(
  setMenu,
  setOrders,
  setSettings
) {
  const [loading, setLoading] = useState(true);
  const [storagePersistent] = useState(() => dataStore.isPersistent());

  useEffect(() => {
    let mounted = true;

    (async () => {
      const [m, o, s] = await Promise.allSettled([
        dataStore.load(STORAGE_KEYS.menu),
        dataStore.load(STORAGE_KEYS.orders),
        dataStore.load(STORAGE_KEYS.settings),
      ]);

      if (!mounted) return;

      if (m.status === "fulfilled" && m.value) {
        setMenu(m.value);
      }

      if (o.status === "fulfilled" && o.value) {
        setOrders(o.value);
      }

      if (s.status === "fulfilled" && s.value) {
        setSettings((prev) => ({
          ...prev,
          ...s.value,
        }));
      }

      setLoading(false);
    })();

    return () => {
      mounted = false;
    };
  }, [setMenu, setOrders, setSettings]);

  return {
  loading,
  storagePersistent,
};
}