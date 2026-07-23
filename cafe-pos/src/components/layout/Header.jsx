import React from "react";
import {
  Coffee,
  ShoppingCart,
  History,
  Settings,
  BarChart3,
} from "lucide-react";
import { COLORS } from "../../data/colors";
import { FONT } from "../../data/fonts";

export default function Header({
  cafeName,
  view,
  setView,
  cart,
}) {
  return (
    <div
      style={{ background: COLORS.espresso }}
      className="px-5 sm:px-8 pt-6 pb-0"
    >
      <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
        <div className="flex items-center gap-2">
          <Coffee size={26} style={{ color: COLORS.brassLight }} />

          <div>
            <h1
              style={{
                fontFamily: FONT.display,
                color: COLORS.brassLight,
              }}
              className="text-4xl leading-none"
            >
              Miga
            </h1>

            <div
              style={{
                fontFamily: FONT.mono,
                color: COLORS.brassLight,
                letterSpacing: "0.1em",
              }}
              className="text-xs uppercase mt-0.5"
            >
              Point of Sale
            </div>
          </div>
        </div>

        <div
          style={{
            color: COLORS.brassLight,
            fontFamily: FONT.mono,
          }}
          className="text-xs"
        >
          {new Date().toLocaleDateString(undefined, {
            weekday: "long",
            month: "short",
            day: "numeric",
          })}
        </div>
      </div>

      <div className="flex gap-1 overflow-x-auto">
        {[
          {
            key: "order",
            label: "New Order",
            icon: ShoppingCart,
          },
          {
            key: "history",
            label: "Sales History",
            icon: History,
          },
          {
            key: "sales",
            label: "Item Sales",
            icon: BarChart3,
          },
          {
            key: "menu",
            label: "Manage Menu",
            icon: Settings,
          },
        ].map(({ key, label, icon: Icon }) => {
          const activeTab = view === key;

          return (
            <button
              key={key}
              onClick={() => setView(key)}
              className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-t-xl transition-colors whitespace-nowrap"
              style={{
                background: activeTab
                  ? COLORS.crema
                  : "transparent",
                color: activeTab
                  ? COLORS.espresso
                  : COLORS.paper,
                opacity: activeTab ? 1 : 0.75,
              }}
            >
              <Icon size={16} />

              {label}

              {key === "order" && cart.length > 0 && (
                <span
                  style={{
                    background: COLORS.rust,
                    color: COLORS.paper,
                  }}
                  className="ml-1 text-xs rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {cart.reduce((s, c) => s + c.qty, 0)}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}