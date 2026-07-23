import React from "react";

export default function SalesView({
  itemSales,
  settings,
}) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">
        Item Sales Report
      </h2>

      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Item</th>
            <th className="text-center py-2">Qty Sold</th>
            <th className="text-right py-2">Revenue</th>
          </tr>
        </thead>

        <tbody>
          {itemSales.map((item) => (
            <tr
              key={item.name}
              className="border-b"
            >
              <td className="py-2">
                {item.name}
              </td>

              <td className="text-center">
                {item.quantity}
              </td>

              <td className="text-right">
                {settings.currency}
                {item.revenue.toFixed(2)}
              </td>
            </tr>
          ))}

          {itemSales.length === 0 && (
            <tr>
              <td
                colSpan={3}
                className="text-center py-8 text-gray-500"
              >
                No sales yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}