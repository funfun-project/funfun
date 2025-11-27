const timeList: string[] = Array.from({ length: 48 }, (_, i) => {
  const h = String(Math.floor(i / 2)).padStart(2, '0');
  const m = i % 2 === 0 ? '00' : '30';
  return `${h}:${m}`;
});

export function getNowTime(): string {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = now.getMinutes() < 30 ? '00' : '30';
  return `${hh}:${mm}`;
}

export function timeConversion(time: string): Date {
  const [hourStr, minuteStr] = time.split(':');

  const hour = Number(hourStr);
  const minute = Number(minuteStr);

  if (isNaN(hour) || hour < 0 || hour > 23 || (minute !== 0 && minute !== 30)) {
    //해당 error 부분은 토스트 띄우기
    throw new Error(`시간이 선택 되지 않았습니다`);
  }

  const date = new Date();
  date.setHours(hour, minute, 0, 0);
  return date;
}

export default timeList;
