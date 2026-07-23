import { uid } from "../utils/uid";

export default function useMenu(menu, persistMenu, activeCategory, setActiveCategory) {
  const addCategory = (name) => {
    const trimmed = name.trim();

    if (!trimmed || menu[trimmed]) return;

    persistMenu({
      ...menu,
      [trimmed]: [],
    });
  };

  const deleteCategory = (name) => {
    const next = { ...menu };

    delete next[name];

    persistMenu(next);

    if (activeCategory === name) {
      setActiveCategory(Object.keys(next)[0] || null);
    }
  };

  const addItem = (category, name, price) => {
    const trimmed = name.trim();
    const p = parseFloat(price);

    if (!trimmed || isNaN(p)) return;

    persistMenu({
      ...menu,
      [category]: [
        ...menu[category],
        {
          id: uid(category),
          name: trimmed,
          price: p,
        },
      ],
    });
  };

  const updateItem = (category, id, updates) => {
    persistMenu({
      ...menu,
      [category]: menu[category].map((item) =>
        item.id === id
          ? { ...item, ...updates }
          : item
      ),
    });
  };

  const deleteItem = (category, id) => {
    persistMenu({
      ...menu,
      [category]: menu[category].filter((item) => item.id !== id),
    });
  };

  return {
    addCategory,
    deleteCategory,
    addItem,
    updateItem,
    deleteItem,
  };
}