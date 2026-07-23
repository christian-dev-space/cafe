import { Download, AlertTriangle } from "lucide-react";

import { COLORS } from "../../data/colors";

export default function HistoryToolbar({
  exportToExcel,
  confirmClear,
  setConfirmClear,
  clearAllOrders,
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
      <h2
        style={{ color: COLORS.espresso }}
        className="text-2xl font-bold"
      >
        Sales History
      </h2>

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={exportToExcel}
          style={{
            background: COLORS.brass,
            color: COLORS.paper,
          }}
          className="px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2"
        >
          <Download size={15} />
          Export to Excel
        </button>

        {!confirmClear ? (
          <button
            onClick={() => setConfirmClear(true)}
            style={{
              color: COLORS.rust,
              border: `1px solid ${COLORS.rust}`,
            }}
            className="px-3 py-2 rounded-xl text-sm font-medium"
          >
            Clear History
          </button>
        ) : (
          <div
            className="flex items-center gap-2 text-sm"
            style={{ color: COLORS.rust }}
          >
            <AlertTriangle size={15} />

            <span>Delete all records?</span>

            <button
              onClick={clearAllOrders}
              style={{
                background: COLORS.rust,
                color: COLORS.paper,
              }}
              className="px-2.5 py-1 rounded-lg font-semibold"
            >
              Yes
            </button>

            <button
              onClick={() => setConfirmClear(false)}
              style={{ color: COLORS.espresso }}
              className="px-2.5 py-1 rounded-lg"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}