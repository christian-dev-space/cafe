export function isSameDay(a, b) {
  return new Date(a).toDateString() === new Date(b).toDateString();
}