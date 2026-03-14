'use client';
import { useState } from 'react';
import Calendar from '../Calendar';
import TimeWheel from './components/TimeWheel';
import { getNowTime } from '@/libs/utils/wheelDate';
import { cn } from '@/libs/utils/twMerge';
import { Dispatch, SetStateAction } from 'react';
import { ChevronLeft } from 'lucide-react';

type Props = {
  type: 'single' | 'double';
  value?: Date | null;
  toggle: Dispatch<SetStateAction<boolean>>;
  onClick: (date: Date | null) => void;
};

export default function DatetimePicker({ type, value, toggle, onClick }: Props) {
  const [selectDate, setSelectDate] = useState<SelectDate>(new Date());
  const [startTime, setStartTime] = useState<PickerValue>({
    time: getNowTime(),
  });
  const [endTime, setEndTime] = useState<PickerValue>({
    time: getNowTime(),
  });

  function successButtonHandler() {
    if (!selectDate) return;
    const combinedDate = new Date(selectDate as Date);

    // if (type === 'double') {
    //   date가 배열 형태일 때 사용할 함수
    //   const [startH, startM] = startTime.time.split(':').map(Number);
    //   const [endH, endM] = endTime.time.split(':').map(Number);

    //   const startDate = combinedDate.setHours(startH!, startM, 0, 0);
    //   const endDate = combinedDate.setHours(endH!, endM, 0, 0);
    //   const dateArray = [startDate, endDate];

    //   onClick(dateArray);
    //   toggle(false);
    // }

    const [hours, minutes] = startTime.time.split(':').map(Number);

    combinedDate.setHours(hours!, minutes, 0, 0);

    console.log(combinedDate);

    onClick(combinedDate);
    toggle(false);
  }

  // 뒤로가기 버튼
  function backButtonHandler() {
    if (value) {
      toggle(false);
      return;
    }
    // null 값을 넣어야 error을 띄움 애초에 뒤로 가기는 date 값을 사용하지 않는다
    onClick(null);
    toggle(false);
  }

  return (
    <div className="bg-bg-main absolute inset-0 z-50 flex flex-col overflow-hidden">
      <div className="relative flex h-[56px] items-center justify-center bg-transparent px-[15px]">
        <button className="text-text-default absolute left-0 z-10" onClick={backButtonHandler}>
          <ChevronLeft size={24} color="#f6f6f6" />
        </button>
        <h1 className="text-text-default text-body3 md:text-body1">요일 설정</h1>
      </div>
      <div className="flex w-full flex-1 flex-col items-center justify-center overflow-hidden px-[15px] pt-[10px] pb-[30px]">
        <Calendar selectDate={selectDate} setSelectDate={setSelectDate} />
      </div>
      <div className="bg-bg-board shrink-0 rounded-tl-[20px] rounded-tr-[20px] px-[15px] pt-[30px] pb-[18px]">
        <div className={cn('mb-[25px] flex', type === 'single' ? 'justify-center' : '')}>
          <div className="w-[calc(50%-0.5px)]">
            <h3 className="text-text-default mb-[25px] text-center text-[16px]">시작 시간</h3>
            <TimeWheel value={startTime} setValue={setStartTime} />
          </div>
          {type === 'double' && (
            <>
              <div className="w-[1px] bg-[#2D2D2D]"></div>
              <div className="w-[calc(50%-0.5px)]">
                <h3 className="text-text-default mb-[25px] text-center text-[16px]">종료 시간</h3>
                <TimeWheel value={endTime} setValue={setEndTime} />
              </div>
            </>
          )}
        </div>
        <button
          className="text-text-default bg-main h-[52px] w-full rounded-[3px] text-center text-[18px] leading-[52px] font-semibold"
          onClick={successButtonHandler}
        >
          완료
        </button>
      </div>
    </div>
  );
}
