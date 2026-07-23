import { COLORS } from "../../data/colors";

export default function CategoryTabs({
  categories,
  activeCategory,
  setActiveCategory,
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-3 mb-1">
      {categories.map((cat) => {
        const active = cat === activeCategory;

        return (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-transform active:scale-95"
            style={{
              background: active ? COLORS.espresso : COLORS.paper,
              color: active ? COLORS.paper : COLORS.espresso,
              border: `1px solid ${
                active ? COLORS.espresso : COLORS.line
              }`,
            }}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}