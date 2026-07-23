import {
  Plus,
  Minus,
  Trash2,
  X,
  Check,
  Loader2,
} from "lucide-react";
import CategoryTabs from "./CategoryTabs";
import MenuGrid from "./MenuGrid";
import CartPanel from "./CartPanel";
import { COLORS } from "../../data/colors";
import { FONT } from "../../data/fonts";
import { formatMoney } from "../../utils/formatMoney";

export default function PosView({menu, activeCategory, setActiveCategory, addToCart, cart, changeQty, removeItem, clearCart, completeOrder, isCompleting, subtotal, tax, total, settings }) {
  const categories = Object.keys(menu);
  const items = menu[activeCategory] || [];

  return (
    <div className="flex flex-col lg:flex-row gap-5">
      <div className="flex-1 min-w-0">
        <CategoryTabs
          categories={categories}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

      <MenuGrid
          items={items}
          addToCart={addToCart}
          settings={settings}
      />
      </div>

      <CartPanel
        cart={cart}
        changeQty={changeQty}
        removeItem={removeItem}
        clearCart={clearCart}
        completeOrder={completeOrder}
        isCompleting={isCompleting}
        subtotal={subtotal}
        tax={tax}
        total={total}
        settings={settings}
      />
    </div>
  );
}