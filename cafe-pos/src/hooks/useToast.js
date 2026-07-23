import { useState, useRef, useCallback } from "react";

export default function useToast() {
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  const showToast = useCallback((message, tone = "brass") => {
    setToast({ message, tone });

    if (toastTimer.current) {
      clearTimeout(toastTimer.current);
    }

    toastTimer.current = setTimeout(() => {
      setToast(null);
    }, 2200);
  }, []);

  return {
    toast,
    showToast,
  };
}