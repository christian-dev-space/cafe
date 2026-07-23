import { useEffect } from "react";

export default function useActiveCategory(
  menu,
  activeCategory,
  setActiveCategory
) {
  useEffect(() => {
    if (!activeCategory) {
      const categories = Object.keys(menu);

      if (categories.length) {
        setActiveCategory(categories[0]);
      }
    }
  }, [menu, activeCategory, setActiveCategory]);
}