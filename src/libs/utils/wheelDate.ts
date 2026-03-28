//["00:00","00:30","01:00"...."23:30"]의 문자열 배열 생성
const timeList: string[] = Array.from({ length: 48 }, (_, i) => {
  const h = String(Math.floor(i / 2)).padStart(2, '0');
  const m = i % 2 === 0 ? '00' : '30';
  return `${h} : ${m}`;
});

//현재 시간을 timeList의 요소에 맞게 변경하는 함수
export function getNowTime(): string {
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = now.getMinutes() < 30 ? '00' : '30';
  return `${hh}:${mm}`;
}

//문자열 시간을 date 객체로 변환하는 함수
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

export function dateToString(date: Date | null): string {
  if (!date) return '';
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const h = date.getHours();
  const m = date.getMinutes();
  console.log(typeof m);

  return `${year}년 ${month}월 ${day}일 ${h}시 ${m < 30 ? '' : m + '분'}`;
}

export default timeList;
