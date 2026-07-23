import { COLORS } from "../../data/colors";
import { FONT } from "../../data/fonts";

export default function SettingsPanel({
  localSettings,
  setLocalSettings,
  persistSettings,
  storagePersistent,
}) {
  return (
    <div>
      <h2
        style={{
          fontFamily: FONT.display,
          color: COLORS.espresso,
        }}
        className="text-2xl mb-3"
      >
        Settings
      </h2>

      <div
        style={{
          background: COLORS.paper,
          border: `1px solid ${COLORS.line}`,
        }}
        className="rounded-2xl p-4 grid grid-cols-1 sm:grid-cols-3 gap-3"
      >
        <div>
          <label
            style={{ color: COLORS.espresso }}
            className="text-xs font-semibold block mb-1"
          >
            Café Name
          </label>

          <input
            value={localSettings.cafeName}
            onChange={(e) =>
              setLocalSettings({
                ...localSettings,
                cafeName: e.target.value,
              })
            }
            onBlur={() => persistSettings(localSettings)}
            style={{
              border: `1px solid ${COLORS.line}`,
              color: COLORS.ink,
            }}
            className="w-full px-3 py-2 rounded-lg text-sm"
          />
        </div>

        <div>
          <label
            style={{ color: COLORS.espresso }}
            className="text-xs font-semibold block mb-1"
          >
            Currency Symbol
          </label>

          <input
            value={localSettings.currency}
            onChange={(e) =>
              setLocalSettings({
                ...localSettings,
                currency: e.target.value,
              })
            }
            onBlur={() => persistSettings(localSettings)}
            style={{
              border: `1px solid ${COLORS.line}`,
              color: COLORS.ink,
            }}
            className="w-full px-3 py-2 rounded-lg text-sm"
          />
        </div>

        <div>
          <label
            style={{ color: COLORS.espresso }}
            className="text-xs font-semibold block mb-1"
          >
            Tax / Service Charge (%)
          </label>

          <input
            type="number"
            min="0"
            step="0.1"
            value={localSettings.taxRate}
            onChange={(e) =>
              setLocalSettings({
                ...localSettings,
                taxRate: e.target.value,
              })
            }
            onBlur={() =>
              persistSettings({
                ...localSettings,
                taxRate: Number(localSettings.taxRate) || 0,
              })
            }
            style={{
              border: `1px solid ${COLORS.line}`,
              color: COLORS.ink,
            }}
            className="w-full px-3 py-2 rounded-lg text-sm"
          />
        </div>

        <div className="sm:col-span-2">
          <label
            style={{ color: COLORS.espresso }}
            className="text-xs font-semibold block mb-1"
          >
            Receipt Address / Contact
          </label>

          <input
            value={localSettings.receiptAddress || ""}
            onChange={(e) =>
              setLocalSettings({
                ...localSettings,
                receiptAddress: e.target.value,
              })
            }
            onBlur={() => persistSettings(localSettings)}
            placeholder="e.g. 123 Rizal St. · 0917 000 0000"
            style={{
              border: `1px solid ${COLORS.line}`,
              color: COLORS.ink,
            }}
            className="w-full px-3 py-2 rounded-lg text-sm"
          />
        </div>

        <div>
          <label
            style={{ color: COLORS.espresso }}
            className="text-xs font-semibold block mb-1"
          >
            Receipt Footer
          </label>

          <input
            value={localSettings.receiptFooter || ""}
            onChange={(e) =>
              setLocalSettings({
                ...localSettings,
                receiptFooter: e.target.value,
              })
            }
            onBlur={() => persistSettings(localSettings)}
            style={{
              border: `1px solid ${COLORS.line}`,
              color: COLORS.ink,
            }}
            className="w-full px-3 py-2 rounded-lg text-sm"
          />
        </div>
      </div>

      <div
        style={{
          color: storagePersistent
            ? COLORS.espresso
            : COLORS.rust,
          opacity: storagePersistent ? 0.55 : 0.9,
        }}
        className="text-xs mt-2"
      >
        {storagePersistent
          ? "Menu, settings, and sales history are saved."
          : "No persistent storage detected."}
      </div>
    </div>
  );
}