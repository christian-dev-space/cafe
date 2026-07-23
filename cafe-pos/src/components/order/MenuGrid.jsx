import { COLORS } from "../../data/colors";
import { FONT } from "../../data/fonts";
import { formatMoney } from "../../utils/formatMoney";

export default function MenuGrid({
  items,
  addToCart,
  settings,
}) {
  return (
    <>
      {items.length === 0 ? (
        <div
          style={{ color: COLORS.espresso, opacity: 0.6 }}
          className="text-sm py-10 text-center"
        >
          No items in this category yet. Add some from Manage Menu.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => addToCart(item)}
              style={{
                background: COLORS.paper,
                border: `1px solid ${COLORS.line}`,
              }}
              className="rounded-2xl p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-md active:translate-y-0 active:shadow-sm"
            >
              <div
                style={{ color: COLORS.ink }}
                className="font-medium text-sm mb-2 leading-snug"
              >
                {item.name}
              </div>

              <div
                style={{
                  color: COLORS.brassDark,
                  fontFamily: FONT.mono,
                }}
                className="text-base font-semibold"
              >
                {formatMoney(item.price, settings.currency)}
              </div>
            </button>
          ))}
        </div>
      )}
    </>
  );
}