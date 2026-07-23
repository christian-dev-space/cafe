import {
  Plus,
  Minus,
  Trash2,
  X,
  Check,
  Loader2,
} from "lucide-react";

import { COLORS } from "../../data/colors";
import { FONT } from "../../data/fonts";
import { formatMoney } from "../../utils/formatMoney";
export default function CartPanel({
  cart,
  clearCart,
  changeQty,
  removeItem,
  settings,
  subtotal,
  tax,
  total,
  completeOrder,
  isCompleting,
}) {
  return (
    <div
      style={{
        background: COLORS.paper,
        border: `1px solid ${COLORS.line}`,
      }}
      className="rounded-2xl overflow-hidden lg:sticky lg:top-4"
    >
      <div style={{ position: "relative", paddingTop: "16px" }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "12px",
            right: "12px",
            borderTop: `2px dashed ${COLORS.line}`,
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "-8px",
            left: "-8px",
            width: "16px",
            height: "16px",
            borderRadius: "9999px",
            background: COLORS.crema,
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "-8px",
            right: "-8px",
            width: "16px",
            height: "16px",
            borderRadius: "9999px",
            background: COLORS.crema,
          }}
        />

        <div className="px-4 pb-2 flex items-center justify-between">
          <span
            style={{
              fontFamily: FONT.mono,
              color: COLORS.espresso,
            }}
            className="text-xs font-semibold tracking-wide uppercase"
          >
            Current Order
          </span>

          {cart.length > 0 && (
            <button
              onClick={clearCart}
              style={{ color: COLORS.rust }}
              className="text-xs flex items-center gap-1 hover:underline"
            >
              <Trash2 size={12} />
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="px-4 max-h-80 overflow-y-auto">
        {cart.length === 0 ? (
          <div
            style={{
              color: COLORS.espresso,
              opacity: 0.5,
            }}
            className="text-sm py-8 text-center"
          >
            Tap an item to add it here
          </div>
        ) : (
          cart.map((c, idx) => (
            <div
              key={c.id}
              style={{
                borderBottom:
                  idx < cart.length - 1
                    ? `1px solid ${COLORS.line}`
                    : "none",
              }}
              className="py-2.5 flex items-center gap-2"
            >
              <div className="flex-1 min-w-0">
                <div
                  style={{ color: COLORS.ink }}
                  className="text-sm font-medium truncate"
                >
                  {c.name}
                </div>

                <div
                  style={{
                    color: COLORS.espresso,
                    opacity: 0.6,
                    fontFamily: FONT.mono,
                  }}
                  className="text-xs"
                >
                  {formatMoney(c.price, settings.currency)} each
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => changeQty(c.id, -1)}
                  style={{
                    background: COLORS.crema,
                    color: COLORS.espresso,
                  }}
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                >
                  <Minus size={12} />
                </button>

                <span
                  style={{
                    fontFamily: FONT.mono,
                    color: COLORS.ink,
                  }}
                  className="text-sm w-5 text-center"
                >
                  {c.qty}
                </span>

                <button
                  onClick={() => changeQty(c.id, 1)}
                  style={{
                    background: COLORS.crema,
                    color: COLORS.espresso,
                  }}
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                >
                  <Plus size={12} />
                </button>
              </div>

              <div
                style={{
                  fontFamily: FONT.mono,
                  color: COLORS.ink,
                }}
                className="text-sm font-semibold w-16 text-right"
              >
                {formatMoney(c.price * c.qty, settings.currency)}
              </div>

              <button
                onClick={() => removeItem(c.id)}
                style={{ color: COLORS.rust }}
                className="opacity-60 hover:opacity-100"
              >
                <X size={14} />
              </button>
            </div>
          ))
        )}
      </div>

     <div
  className="px-4 pt-3 pb-4 mt-2"
  style={{ borderTop: `1px dashed ${COLORS.line}` }}
>
  <div
    className="flex justify-between text-sm mb-1"
    style={{ color: COLORS.espresso, fontFamily: FONT.mono }}
  >
    <span>Subtotal</span>
    <span>{formatMoney(subtotal, settings.currency)}</span>
  </div>

  {settings.taxRate > 0 && (
    <div
      className="flex justify-between text-sm mb-1"
      style={{ color: COLORS.espresso, fontFamily: FONT.mono }}
    >
      <span>Tax ({settings.taxRate}%)</span>
      <span>{formatMoney(tax, settings.currency)}</span>
    </div>
  )}

  <div
    className="flex justify-between text-lg font-bold mb-3"
    style={{ color: COLORS.ink, fontFamily: FONT.mono }}
  >
    <span>Total</span>
    <span>{formatMoney(total, settings.currency)}</span>
  </div>

  <button
    onClick={completeOrder}
    disabled={cart.length === 0 || isCompleting}
    style={{
      background: cart.length === 0 ? COLORS.line : COLORS.brass,
      color: COLORS.paper,
      cursor:
        cart.length === 0 || isCompleting
          ? "not-allowed"
          : "pointer",
      opacity: isCompleting ? 0.75 : 1,
    }}
    className="w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-transform active:scale-95"
  >
    {isCompleting ? (
      <Loader2 size={17} className="animate-spin" />
    ) : (
      <Check size={17} />
    )}

    {isCompleting ? "Processing…" : "Complete Order"}
  </button>
</div>
    </div>
  );
}