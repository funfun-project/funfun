type DatePiece = Date | null;
type SelectDate = DatePiece | [DatePiece, DatePiece];

type CalendarProp = {
  selectDate: SelectDate;
  setSelectDate: (value: SelectDate) => void;
};
