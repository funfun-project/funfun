export function bubbleTime(date: Date): string {
  const hh = date.getHours();
  const mm = date.getMinutes();
  if (hh <= 12) return `오전 ${hh}시 ${mm}분`;
  return `오후 ${hh % 12}시 ${mm}분`;
}
