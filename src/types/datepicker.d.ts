import timeList from '@/libs/utils/wheelDate';

export {};

declare global {
  type Selections = {
    time: typeof timeList;
  };

  type ColumnName = keyof Selections;

  type PickerValue = {
    [K in ColumnName]: string;
  };

  type DatePickerProp = {
    value: PickerValue;
    setValue: (value: PickerValue) => void;
  };
}
