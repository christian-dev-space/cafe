import { AlertTriangle } from "lucide-react";

import { COLORS } from "../../data/colors";

export default function ResetSection({
  confirmReset,
  setConfirmReset,
  resetEverything,
}) {
  return (
    <div
      style={{ borderTop: `1px dashed ${COLORS.line}` }}
      className="pt-4"
    >
      {!confirmReset ? (
        <button
          onClick={() => setConfirmReset(true)}
          style={{ color: COLORS.rust }}
          className="text-sm underline"
        >
          Reset menu, settings & sales history to defaults
        </button>
      ) : (
        <div
          className="flex flex-wrap items-center gap-2 text-sm"
          style={{ color: COLORS.rust }}
        >
          <AlertTriangle size={15} />

          <span>
            This clears everything and can't be undone.
          </span>

          <button
            onClick={resetEverything}
            style={{
              background: COLORS.rust,
              color: COLORS.paper,
            }}
            className="px-2.5 py-1 rounded-lg font-semibold"
          >
            Confirm Reset
          </button>

          <button
            onClick={() => setConfirmReset(false)}
            style={{ color: COLORS.espresso }}
            className="px-2.5 py-1 rounded-lg"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}