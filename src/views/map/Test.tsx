'use client';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../../assets/styles/calendar.css';
import '../../assets/styles/wheel.css';
import Picker from 'react-mobile-picker';

import timeList, { getNowTime } from '@/lib/utils/wheelDate';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const selections = {
  time: timeList,
};

type ColumnName = keyof typeof selections;
type PickerValue = { [K in ColumnName]: string };

export default function Test() {
  const [value, onChange] = useState<Value>(new Date());

  const [pickerValue, setPickerValue] = useState<PickerValue>({
    time: getNowTime(),
  });

  return (
    <div className="bg-bg-main flex w-[375px] flex-col justify-center">
      <div className="bg-bg-input h-[56px]"></div>
      <div className="pt-[10px] pb-[30px]">
        <Calendar
          selectRange={false}
          onChange={onChange}
          value={value}
          locale="ko-KR"
          calendarType="gregory"
          formatDay={(_, date) => String(date.getDate())}
        />
      </div>
      <div className="bg-bg-board rounded-tl-[20px] rounded-tr-[20px] px-[15px] pt-[30px] pb-[18px]">
        <div className="mb-[25px] flex">
          <div className="w-[calc(50%-0.5px)]">
            <h3 className="text-text-default mb-[25px] text-center text-[16px]">시작 시간</h3>
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
          </div>
          <div className="w-[1px] bg-[#2D2D2D]"></div>
          <div className="w-[calc(50%-0.5px)]">
            <h3 className="text-text-default mb-[25px] text-center text-[16px]">종료 시간</h3>
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
          </div>
        </div>
        <button className="text-text-default bg-main h-[52px] w-full rounded-[3px] text-center text-[18px] leading-[52px] font-semibold">
          완료
        </button>
      </div>
    </div>
  );
}
