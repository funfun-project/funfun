'use client';

import { useMemo, useState, useEffect } from 'react';
import Picker from 'react-mobile-picker';
import '../../../assets/styles/wheel.css';
import throttle from 'lodash.throttle';
import timeList from '@/lib/utils/wheelDate';

type PickerValue = { time: string };

interface DatePickerProp {
  value: PickerValue;
  setValue: (value: PickerValue) => void;
}

function createThrottledSetter<T>(setter: (value: T) => void, wait = 80): (value: T) => void {
  return throttle(setter, wait) as (value: T) => void;
}

export default function TimeWheel({ value, setValue }: DatePickerProp) {
  const baseTimeList = timeList;

  const options = useMemo(
    () => baseTimeList.map((label, index) => ({ label, value: String(index) })),
    [baseTimeList],
  );

  const getInitialIndex = () => {
    const idx = baseTimeList.indexOf(value.time);
    return idx === -1 ? 0 : idx;
  };

  const [pickerValue, setPickerValue] = useState<PickerValue>({
    time: String(getInitialIndex()),
  });

  const throttledSetValue = useMemo(
    () => createThrottledSetter<PickerValue>(setValue, 80),
    [setValue],
  );

  useEffect(() => {
    const idx = baseTimeList.indexOf(value.time);
    if (idx !== -1) {
      setPickerValue({ time: String(idx) });
    }
  }, [value.time, baseTimeList]);

  const handleChange = (selected: PickerValue) => {
    const index = Number(selected.time);
    if (!Number.isInteger(index)) return;

    const label = baseTimeList[index];
    if (!label) return;

    setPickerValue(selected);
    throttledSetValue({ time: label });
  };

  return (
    <Picker
      value={pickerValue}
      onChange={handleChange}
      height={174}
      itemHeight={58}
      wheelMode="normal"
      className="picker-no-highlight"
    >
      <Picker.Column name="time">
        {options.map((option) => (
          <Picker.Item key={option.value} value={option.value}>
            {({ selected }) => (
              <div
                className={[
                  'h-[58px] text-center text-[32px] leading-[58px]',
                  selected ? 'text-[#f6f6f6]' : 'text-[#5E5E5E]',
                ].join(' ')}
              >
                {option.label}
              </div>
            )}
          </Picker.Item>
        ))}
      </Picker.Column>
    </Picker>
  );
}
