import { API } from "../config/api";
import { apiGet, apiPost } from "./api";
// const USE_REMOTE_STORAGE = API.baseUrl !== "";
const memoryFallback = new Map();
function hasLocalStorage() {
  try {
    return typeof window !== "undefined" && !!window.localStorage;
  } catch {
    return false;
  }
}
let hasWarnedNoStorage = false;

function hasPersistentStorage() {
  return typeof window !== 'undefined' && !!window.storage;
}

const dataStore = {
  isPersistent: hasPersistentStorage,

async load(key) {
  // Try Cloudflare first
  if (API.baseUrl) {
    try {
      return await apiGet(`/storage/${key}`);
    } catch (err) {
      console.warn("Cloud storage unavailable, falling back to localStorage.", err);
    }
  }

  // Existing window.storage
  if (hasPersistentStorage()) {
    const res = await window.storage.get(key, true);
    return res && res.value ? JSON.parse(res.value) : null;
  }

  // localStorage
  if (hasLocalStorage()) {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  }

  // Memory fallback
  if (!hasWarnedNoStorage) {
    hasWarnedNoStorage = true;
    console.warn("No persistent storage available.");
  }

  const raw = memoryFallback.get(key);
  return raw ? JSON.parse(raw) : null;
},

async save(key, value) {
  // Try Cloudflare first
  if (API.baseUrl) {
    try {
      await apiPost("/storage", {
        key,
        value,
      });

      // Keep a local copy too
      if (hasLocalStorage()) {
        localStorage.setItem(key, JSON.stringify(value));
      }

      return;
    } catch (err) {
      console.warn("Cloud save failed, saving locally.", err);
    }
  }

  const payload = JSON.stringify(value);

  // Existing window.storage
  if (hasPersistentStorage()) {
    const result = await window.storage.set(key, payload, true);

    if (!result) {
      throw new Error(`Storage write for "${key}" did not confirm`);
    }

    return;
  }

  // localStorage
  if (hasLocalStorage()) {
    localStorage.setItem(key, payload);
    return;
  }

  // Memory fallback
  memoryFallback.set(key, payload);
},
};
export default dataStore;