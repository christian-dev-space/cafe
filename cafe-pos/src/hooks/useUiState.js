import { useState } from "react";

export default function useUiState() {
  const [view, setView] = useState("order");

  const [confirmClear, setConfirmClear] = useState(false);

  const [confirmReset, setConfirmReset] = useState(false);

  const [receipt, setReceipt] = useState(null);

  return {
    view,
    setView,

    confirmClear,
    setConfirmClear,

    confirmReset,
    setConfirmReset,

    receipt,
    setReceipt,
  };
}