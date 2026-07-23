import { Printer } from "lucide-react";

import { COLORS } from "../../data/colors";
import { FONT } from "../../data/fonts";
import { formatMoney } from "../../utils/formatMoney";

export default function OrderCard({
  order,
  orderNumber,
  expanded,
  setExpanded,
  settings,
  onReprint,
}) {
  const isOpen = expanded === order.id;

  return (
    <div
      style={{
        background: COLORS.paper,
        border: `1px solid ${COLORS.line}`,
      }}
      className="rounded-xl overflow-hidden"
    >
      <button
        onClick={() => setExpanded(isOpen ? null : order.id)}
        className="w-full flex items-center justify-between px-4 py-3 text-left"
      >
        <div className="flex items-center gap-3">
          <span
            style={{
              fontFamily: FONT.mono,
              color: COLORS.brassDark,
            }}
            className="text-xs font-bold"
          >
            #{orderNumber}
          </span>

          <div>
            <div
              style={{ color: COLORS.ink }}
              className="text-sm font-medium"
            >
              {order.items.reduce((s, it) => s + it.qty, 0)} item(s)
            </div>

            <div
              style={{
                color: COLORS.espresso,
                opacity: 0.6,
              }}
              className="text-xs"
            >
              {new Date(order.timestamp).toLocaleString()}
            </div>
          </div>
        </div>

        <span
          style={{
            fontFamily: FONT.mono,
            color: COLORS.ink,
          }}
          className="font-semibold"
        >
          {formatMoney(order.total, settings.currency)}
        </span>
      </button>

      {isOpen && (
        <div
          className="px-4 pb-3 pt-1"
          style={{
            borderTop: `1px dashed ${COLORS.line}`,
          }}
        >
          {order.items.map((it, idx) => (
            <div
              key={idx}
              className="flex justify-between text-sm py-1"
              style={{
                color: COLORS.espresso,
                fontFamily: FONT.mono,
              }}
            >
              <span>
                {it.qty}x {it.name}
              </span>

              <span>
                {formatMoney(
                  it.price * it.qty,
                  settings.currency
                )}
              </span>
            </div>
          ))}

          <button
            onClick={() => onReprint(order)}
            style={{
              color: COLORS.brassDark,
            }}
            className="mt-2 text-xs font-semibold flex items-center gap-1.5 hover:underline"
          >
            <Printer size={13} />
            Print Receipt
          </button>
        </div>
      )}
    </div>
  );
}