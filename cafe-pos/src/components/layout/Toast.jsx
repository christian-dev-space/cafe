import React from "react";
import { Check } from "lucide-react";
import { COLORS } from "../../data/colors";

export default function Toast({ toast }) {
  if (!toast) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: "50%",
        bottom: "24px",
        transform: "translateX(-50%)",
        background:
          toast.tone === "rust"
            ? COLORS.rust
            : COLORS.espresso,
        color: COLORS.paper,
        animation: "cafeToastIn 0.25s ease-out",
      }}
      className="px-4 py-2.5 rounded-xl text-sm shadow-lg z-50 flex items-center gap-2"
    >
      <Check size={15} />
      {toast.message}
    </div>
  );
}