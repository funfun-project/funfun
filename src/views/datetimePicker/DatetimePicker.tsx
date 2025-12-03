'use client';
import { useState, useEffect } from 'react';
import Calendar from './components/Calendar';
import TimeWheel from './components/TimeWheel';
import Button from './components/Button';
import { getNowTime } from '@/lib/utils/wheelDate';

export default function DatetimePicker() {
  const [selectDate, setSelectDate] = useState<SelectDate>(new Date());
  const [startTime, setStartTime] = useState<PickerValue>({
    time: getNowTime(),
  });
  const [endTime, setEndTime] = useState<PickerValue>({
    time: getNowTime(),
  });

  useEffect(() => {
    console.log('⏱ startTime changed:', startTime.time);
  }, [startTime]);

  useEffect(() => {
    console.log('⏱ endTime changed:', endTime.time);
  }, [endTime]);

  return (
    <div className="bg-bg-main flex w-[375px] flex-col justify-center">
      <div className="bg-bg-input h-[56px]"></div>
      <div className="pt-[10px] pb-[30px]">
        <Calendar selectDate={selectDate} setSelectDate={setSelectDate} />
      </div>
      <div className="bg-bg-board rounded-tl-[20px] rounded-tr-[20px] px-[15px] pt-[30px] pb-[18px]">
        <div className="mb-[25px] flex">
          <div className="w-[calc(50%-0.5px)]">
            <h3 className="text-text-default mb-[25px] text-center text-[16px]">시작 시간</h3>
            <TimeWheel value={startTime} setValue={setStartTime} />
          </div>
          <div className="w-[1px] bg-[#2D2D2D]"></div>
          <div className="w-[calc(50%-0.5px)]">
            <h3 className="text-text-default mb-[25px] text-center text-[16px]">종료 시간</h3>
            <TimeWheel value={endTime} setValue={setEndTime} />
          </div>
        </div>
        <Button startTime={startTime} endTime={endTime} />
      </div>
    </div>
  );
}
