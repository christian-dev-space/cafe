import * as XLSX from "xlsx";
import { STORAGE_KEYS } from "../data/storageKeys";
import dataStore from "../services/storage";

export default function useOrders(
  orders,
  setOrders,
  settings,
  showToast,
  setConfirmClear
) {
  const persistOrders = async (next) => {
    setOrders(next);

    try {
      await dataStore.save(STORAGE_KEYS.orders, next);
      return true;
    } catch (e) {
      showToast(
        "Saved on screen, but couldn't sync — check your connection",
        "rust"
      );
      return false;
    }
  };

  const clearAllOrders = async () => {
    await persistOrders([]);
    setConfirmClear(false);
    showToast("Sales history cleared");
  };

  const exportToExcel = () => {
    if (orders.length === 0) {
      showToast("No orders to export yet", "rust");
      return;
    }

    try {
      const ordersSheet = orders.map((o, idx) => ({
        "Order #": idx + 1,
        Date: new Date(o.timestamp).toLocaleDateString(),
        Time: new Date(o.timestamp).toLocaleTimeString(),
        Items: o.items.map((i) => `${i.qty}x ${i.name}`).join(", "),
        Subtotal: Number(o.subtotal.toFixed(2)),
        Tax: Number(o.tax.toFixed(2)),
        Total: Number(o.total.toFixed(2)),
      }));

      const itemRows = [];

      orders.forEach((o, idx) => {
        o.items.forEach((i) => {
          itemRows.push({
            "Order #": idx + 1,
            Date: new Date(o.timestamp).toLocaleDateString(),
            Item: i.name,
            Qty: i.qty,
            "Unit Price": i.price,
            "Line Total": Number((i.price * i.qty).toFixed(2)),
          });
        });
      });

      const summaryMap = {};

      orders.forEach((o) => {
        o.items.forEach((i) => {
          if (!summaryMap[i.name]) {
            summaryMap[i.name] = {
              qty: 0,
              revenue: 0,
            };
          }

          summaryMap[i.name].qty += i.qty;
          summaryMap[i.name].revenue += i.qty * i.price;
        });
      });

      const summaryRows = Object.entries(summaryMap)
        .map(([name, d]) => ({
          Item: name,
          "Qty Sold": d.qty,
          Revenue: Number(d.revenue.toFixed(2)),
        }))
        .sort((a, b) => b["Qty Sold"] - a["Qty Sold"]);

      const wb = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(
        wb,
        XLSX.utils.json_to_sheet(ordersSheet),
        "Orders"
      );

      XLSX.utils.book_append_sheet(
        wb,
        XLSX.utils.json_to_sheet(itemRows),
        "Item Details"
      );

      XLSX.utils.book_append_sheet(
        wb,
        XLSX.utils.json_to_sheet(summaryRows),
        "Item Summary"
      );

      const dateStr = new Date().toISOString().slice(0, 10);

      const safeName = (settings.cafeName || "cafe")
        .replace(/\s+/g, "-")
        .toLowerCase();

      XLSX.writeFile(
        wb,
        `${safeName}-sales-${dateStr}.xlsx`
      );

      showToast("Report exported");
    } catch (e) {
      showToast("Couldn't export the report", "rust");
    }
  };

  return {
    persistOrders,
    clearAllOrders,
    exportToExcel,
  };
}