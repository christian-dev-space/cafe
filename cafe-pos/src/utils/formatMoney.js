export function formatMoney(amount, currency) {
  const n = Number(amount) || 0;
  return `${currency}${n.toFixed(2)}`;
}