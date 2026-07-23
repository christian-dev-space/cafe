import Stat from "../estat";
import { formatMoney } from "../../utils/formatMoney";

export default function HistoryStats({
  todayRevenue,
  todayCount,
  allRevenue,
  orders,
  currency,
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
      <Stat
        label="Today's Sales"
        value={formatMoney(todayRevenue, currency)}
      />

      <Stat
        label="Today's Orders"
        value={todayCount}
      />

      <Stat
        label="All-Time Sales"
        value={formatMoney(allRevenue, currency)}
      />

      <Stat
        label="All-Time Orders"
        value={orders.length}
      />
    </div>
  );
}