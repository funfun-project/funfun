const timeList: string[] = Array.from({ length: 48 }, (_, i) => {
  const h = String(Math.floor(i / 2)).padStart(2, '0');
  const m = i % 2 === 0 ? '00' : '30';
  return `${h}:${m}`;
});

function getNowTime(): string {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = now.getMinutes() < 30 ? '00' : '30';
  return `${hh}:${mm}`;
}

export const nowTime: string = getNowTime();

export default timeList;
