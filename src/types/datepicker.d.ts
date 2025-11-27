import timeList from '@/lib/utils/wheelDate';

export {};

declare global {
  type Selections = {
    time: typeof timeList;
  };

  type ColumnName = keyof Selections;

  type PickerValue = {
    [K in ColumnName]: Date;
  };

  type DatePickerProp = {
    value: PickerValue;
    setValue: (value: PickerValue) => void;
  };
}
