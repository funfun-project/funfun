'use client';
import { Calendar as ReactCalendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '@/assets/styles/calendar.css';

export default function Calendar({ selectDate, setSelectDate }: CalendarProp) {
  const handleChange = (selectedDate: SelectDate) => {
    setSelectDate(selectedDate);
    console.log(selectDate);
  };

  return (
    <>
      <ReactCalendar
        selectRange={false}
        onChange={handleChange}
        value={selectDate}
        locale="ko-KR"
        calendarType="gregory"
        formatDay={(_, date) => String(date.getDate())}
        minDate={new Date()}
      />
    </>
  );
}
