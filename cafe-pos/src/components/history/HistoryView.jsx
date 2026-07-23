import { useState } from "react";
// import { Printer } from "lucide-react";

// import Stat from "../estat";

import { COLORS } from "../../data/colors";
// import { FONT } from "../../data/fonts";
// import { formatMoney } from "../../utils/formatMoney";
import HistoryStats from "./HistoryStats";
import HistoryToolbar from "./HistoryToolbar";
import OrderCard from "./OrderCard";
export default function HistoryView({
  orders,
  settings,
  todayRevenue,
  todayCount,
  allRevenue,
  exportToExcel,
  confirmClear,
  setConfirmClear,
  clearAllOrders,
  onReprint,
}) {
  const sorted = [...orders].sort((a, b) => b.timestamp - a.timestamp);
  const [expanded, setExpanded] = useState(null);

  return (
    <div>
      <HistoryStats
        todayRevenue={todayRevenue}
        todayCount={todayCount}
        allRevenue={allRevenue}
        orders={orders}
        currency={settings.currency}
      />

      <HistoryToolbar
        exportToExcel={exportToExcel}
        confirmClear={confirmClear}
        setConfirmClear={setConfirmClear}
        clearAllOrders={clearAllOrders}
      />

      {sorted.length === 0 ? (
        <div
          style={{
            color: COLORS.espresso,
            opacity: 0.6,
          }}
          className="text-sm py-12 text-center"
        >
          No completed orders yet. They'll show up here once you complete an
          order.
        </div>
      ) : (
        <div className="space-y-2">
          {sorted.map((o, i) => (
  <OrderCard
    key={o.id}
    order={o}
    orderNumber={sorted.length - i}
    expanded={expanded}
    setExpanded={setExpanded}
    settings={settings}
    onReprint={onReprint}
  />
))}
        </div>
      )}
    </div>
  );
}