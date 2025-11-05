'use client';
import { useState } from 'react';
import { Calendar as ReactCalendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../../assets/styles/calendar.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function Calendar() {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <>
      <ReactCalendar
        selectRange={false}
        onChange={onChange}
        value={value}
        locale="ko-KR"
        calendarType="gregory"
        formatDay={(_, date) => String(date.getDate())}
      />
    </>
  );
}
