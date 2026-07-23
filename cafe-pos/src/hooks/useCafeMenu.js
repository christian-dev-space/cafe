import useMenu from "./useMenu";
import useMenuStorage from "./useMenuStorage";

export default function useCafeMenu(
  menu,
  setMenu,
  activeCategory,
  setActiveCategory,
  showToast
) {
  const { persistMenu } = useMenuStorage(
    setMenu,
    showToast
  );

  const menuActions = useMenu(
    menu,
    persistMenu,
    activeCategory,
    setActiveCategory
  );

  return {
    ...menuActions,
    persistMenu,
  };
}