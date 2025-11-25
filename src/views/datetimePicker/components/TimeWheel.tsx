'use client';
import { useState } from 'react';
import Picker from 'react-mobile-picker';
import '../../../assets/styles/wheel.css';
import timeList, { nowTime } from '@/lib/utils/wheelDate';

const selections = {
  time: timeList,
};

type ColumnName = keyof typeof selections;
type PickerValue = { [K in ColumnName]: string };

export default function TimeWheel() {
  const [pickerValue, setPickerValue] = useState<PickerValue>({
    time: nowTime,
  });

  return (
    <>
      <Picker
        value={pickerValue}
        onChange={setPickerValue}
        height={174}
        itemHeight={58}
        wheelMode={'normal'}
        className="picker-no-highlight"
      >
        {(Object.entries(selections) as [ColumnName, readonly string[]][]).map(
          ([name, options]) => (
            <Picker.Column key={name} name={name}>
              {options.map((option) => (
                <Picker.Item key={option} value={option}>
                  {({ selected }) => (
                    <div
                      className={[
                        'h-[58px] text-center text-[32px] leading-[58px]',
                        selected ? 'text-[#f6f6f6]' : 'text-[#5E5E5E]',
                      ].join(' ')}
                    >
                      {option}
                    </div>
                  )}
                </Picker.Item>
              ))}
            </Picker.Column>
          ),
        )}
      </Picker>
    </>
  );
}
