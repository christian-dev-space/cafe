import { X, PlusCircle } from "lucide-react";

import { COLORS } from "../../data/colors";
import { FONT } from "../../data/fonts";

export default function CategoryItems({
  cat,
  items,
  updateItem,
  deleteItem,
  draft,
  setDraft,
  submitNewItem,
}) {
  return (
    <>
      <div className="space-y-1.5 mb-3">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-2">
            <input
              defaultValue={item.name}
              onBlur={(e) =>
                updateItem(cat, item.id, {
                  name: e.target.value,
                })
              }
              style={{
                border: `1px solid ${COLORS.line}`,
                color: COLORS.ink,
              }}
              className="flex-1 px-2.5 py-1.5 rounded-lg text-sm"
            />

            <input
              type="number"
              step="0.01"
              defaultValue={item.price}
              onBlur={(e) =>
                updateItem(cat, item.id, {
                  price: parseFloat(e.target.value) || 0,
                })
              }
              style={{
                border: `1px solid ${COLORS.line}`,
                color: COLORS.ink,
                fontFamily: FONT.mono,
              }}
              className="w-full sm:w-24 px-2.5 py-1.5 rounded-lg text-sm"
            />

            <button
              onClick={() => deleteItem(cat, item.id)}
              style={{ color: COLORS.rust }}
            >
              <X size={15} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <input
          placeholder="New item name"
          value={draft.name}
          onChange={(e) => setDraft(cat, "name", e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submitNewItem(cat);
          }}
          style={{
            border: `1px solid ${COLORS.line}`,
            color: COLORS.ink,
          }}
          className="w-full sm:flex-1 px-2.5 py-1.5 rounded-lg text-sm"
        />

        <input
          placeholder="Price"
          type="number"
          step="0.01"
          value={draft.price}
          onChange={(e) => setDraft(cat, "price", e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") submitNewItem(cat);
          }}
          style={{
            border: `1px solid ${COLORS.line}`,
            color: COLORS.ink,
            fontFamily: FONT.mono,
          }}
          className="w-full sm:w-24 px-2.5 py-1.5 rounded-lg text-sm"
        />

        <button
          onClick={() => submitNewItem(cat)}
          style={{
            background: COLORS.brass,
            color: COLORS.paper,
          }}
          className="w-full sm:w-auto px-3 py-2 rounded-lg text-sm flex items-center justify-center gap-1 whitespace-nowrap"
        >
          <PlusCircle size={14} />
          Add
        </button>
      </div>
    </>
  );
}