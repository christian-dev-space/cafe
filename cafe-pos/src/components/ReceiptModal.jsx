import { useEffect } from "react";
import { Printer } from "lucide-react";

import { COLORS } from "../data/colors";
import { FONT } from "../data/fonts";
import { formatMoney } from "../utils/formatMoney";

export default function ReceiptModal({ order, settings, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="cafe-pos-receipt-overlay"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(30, 22, 17, 0.55)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "24px 16px",
        overflowY: "auto",
        zIndex: 70,
      }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Receipt"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="cafe-pos-receipt-card"
        style={{
          background: "#FFFFFF",
          color: "#1E1611",
          width: "100%",
          maxWidth: "340px",
          borderRadius: "18px",
          boxShadow: "0 20px 50px rgba(0,0,0,0.35)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "22px 22px 16px",
            fontFamily: FONT.mono,
          }}
        >
          <div className="text-center mb-3">
            <div
              style={{
                fontFamily: FONT.display,
                fontSize: "30px",
                lineHeight: 1,
                color: COLORS.espresso,
              }}
            >
              {settings.cafeName}
            </div>

            {settings.receiptAddress && (
              <div className="text-xs mt-1" style={{ opacity: 0.65 }}>
                {settings.receiptAddress}
              </div>
            )}

            <div className="text-xs mt-2" style={{ opacity: 0.65 }}>
              {new Date(order.timestamp).toLocaleString()}
            </div>

            {order.dailyNumber != null && (
              <div className="text-xs" style={{ opacity: 0.65 }}>
                Order #{order.dailyNumber} today
              </div>
            )}
          </div>

          <div
            style={{
              borderTop: "1px dashed #ccc",
              margin: "12px 0",
            }}
          />

          <div>
            {order.items.map((it, idx) => (
              <div key={idx} className="flex justify-between text-sm py-1">
                <span>
                  {it.qty}x {it.name}
                </span>

                <span>
                  {formatMoney(it.price * it.qty, settings.currency)}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              borderTop: "1px dashed #ccc",
              margin: "12px 0",
            }}
          />

          <div className="flex justify-between text-sm">
            <span>Subtotal</span>

            <span>
              {formatMoney(order.subtotal, settings.currency)}
            </span>
          </div>

          {order.tax > 0 && (
            <div className="flex justify-between text-sm">
              <span>
                Tax
                {order.taxRate != null
                  ? ` (${order.taxRate}%)`
                  : ""}
              </span>

              <span>
                {formatMoney(order.tax, settings.currency)}
              </span>
            </div>
          )}

          <div
            className="flex justify-between text-base font-bold mt-1.5"
            style={{ color: COLORS.ink }}
          >
            <span>Total</span>

            <span>
              {formatMoney(order.total, settings.currency)}
            </span>
          </div>

          <div
            style={{
              borderTop: "1px dashed #ccc",
              margin: "12px 0",
            }}
          />

          <div className="text-center text-xs" style={{ opacity: 0.75 }}>
            {settings.receiptFooter || "Thank you!"}
          </div>
        </div>

        <div
          className="cafe-pos-no-print flex gap-2 p-4"
          style={{
            borderTop: "1px solid #eee",
          }}
        >
          <button
            onClick={() => window.print()}
            style={{
              background: COLORS.brass,
              color: "#fff",
            }}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
          >
            <Printer size={16} />
            Print Receipt
          </button>

          <button
            onClick={onClose}
            style={{
              border: `1px solid ${COLORS.line}`,
              color: COLORS.espresso,
            }}
            className="px-4 py-2.5 rounded-xl text-sm font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}