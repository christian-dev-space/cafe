import { Trash2 } from "lucide-react";
import { COLORS } from "../../data/colors";

export default function CategoryCard({
  category,
  deleteCategory,
  children,
}) {
  return (
    <div
      style={{
        background: COLORS.paper,
        border: `1px solid ${COLORS.line}`,
      }}
      className="rounded-2xl p-4"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
        <h3
          style={{ color: COLORS.ink }}
          className="font-semibold"
        >
          {category}
        </h3>

          <button
            onClick={() => deleteCategory(category)}
            style={{ color: COLORS.rust }}
            className="self-start sm:self-auto text-xs flex items-center gap-1 hover:underline"
          >
          <Trash2 size={12} />
          Remove Category
        </button>
      </div>

      {children}
    </div>
  );
}